import { useState, useEffect, useRef } from "react";
import "./wikiSearch.css";
import { useFetch } from "../../../components/Hooks/useFetch"; // Import the useFetch hook

interface SearchResult {
  title: string;
  snippet: string;
}

interface SearchInfo {
  totalhits: number;
}

interface WikipediaApiResponse {
  query: {
    search: SearchResult[];
    searchinfo: SearchInfo;
  };
}

export default function WikiSearch() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchInfo, setSearchInfo] = useState<SearchInfo>({ totalhits: 0 });

  const inputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the input element

  // Use the useFetch hook to fetch data within the component
  const { data, isError } = useFetch<WikipediaApiResponse>(
    `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=8&srsearch=${search}`
  );

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (search === "") {
      setResults([]);
      setSearchInfo({ totalhits: 0 });
      return;
    }

    if (isError) {
      // Handle error here
      console.error("Error fetching data.");
      return;
    }

    setResults(data?.query?.search || []);
    setSearchInfo(data?.query?.searchinfo || { totalhits: 0 });
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (search === "") {
      setResults([]);
      setSearchInfo({ totalhits: 0 });
    }
  }, [search]);

  return (
    <div className="search-container">
      <h1>Wiki search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Search about articles"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {searchInfo.totalhits ? (
          <p>Search result: {searchInfo.totalhits}</p>
        ) : (
          ""
        )}
      </form>

      <ul className="search-result">
        {results.map((result, i) => (
          <li key={i}>
            <h3>{result.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
            <a
              href={`https://en.wikipedia.org/wiki/${result.title}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
