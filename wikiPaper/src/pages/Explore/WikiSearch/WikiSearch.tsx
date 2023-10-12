import { useState, useContext, useRef } from "react";
import Logo from "../../../components/Logo/Logo";
import { useFetch } from "../../../components/Hooks/searchUseFetch";
import { ThemeContext } from "../../../components/Hooks/ThemeContext";
import Button from "../../../components/Button/Button";
import "./wikiSearch.css";

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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const context = useContext(ThemeContext);
  const theme = context?.theme;
  const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=8&srsearch=${search}`;

  const { data, isLoading, isError } = useFetch<WikipediaApiResponse>(apiUrl);

  const handleSearch = () => {
    setIsSearchVisible(true);
  };

  const handleClose = () => {
    setIsSearchVisible(false);
    setSearch("");
  };

  return (
    <div className="search-container">
      <Logo />
      <h1>Wiki search engine</h1>
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          type="text"
          placeholder="Search about articles"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ref={inputRef}
        />
        <Button className="search-btn" onClick={handleSearch} text="search" />
        {isSearchVisible && (
          <button type="button" className="close-btn" onClick={handleClose}>
            <span>&times;</span>
          </button>
        )}
      </form>
      {isSearchVisible && (
        <div>
          {isLoading && <div>Loading...</div>}
          {isError && <div></div>}
          {data && (
            <div>
              <p className="total-hits">
                Search result: <span>{data.query.searchinfo.totalhits}</span>
              </p>
              <ul className="search-result">
                {data.query.search.map((result, i) => (
                  <li
                    key={i}
                    className={`search-card ${
                      theme === "dark" ? "search-card-dark" : ""
                    }`}
                  >
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
          )}
        </div>
      )}
    </div>
  );
}
