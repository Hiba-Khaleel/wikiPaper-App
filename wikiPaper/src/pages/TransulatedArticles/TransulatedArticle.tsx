import React, { useState, useEffect, useRef } from "react";
import Loading from "../../components/Loading/Loading";
import articlesData from "./articlesData.json";
import { useFetch } from "../../components/Hooks/useFetch"; // Import the useFetch hook

import "./TransulatedLanguages.css";

interface Article {
  title: string;
  value: string;
  extract: string;
}

interface Language {
  name: string;
  value: string;
}

interface WikipediaData {
  articles: Article[];
  languages: Language[];
}
interface WikipediaResponse {
  query: {
    pages: {
      [pageId: string]: Article; // Assuming 'Article' is the correct type for a page
    };
  };
}

const Languages: React.FC = () => {
  // Define state variables and their types
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [selectedArticle, setSelectedArticle] = useState<string>("Twitter");

  // Destructure data from articlesData and provide type information
  const { articles, languages }: WikipediaData = articlesData;

  // Define a ref for the extract element
  const extractRef = useRef<HTMLDivElement | null>(null);

  // Define the URL for the Wikipedia API
  const apiUrl = `https://${selectedLanguage}.wikipedia.org/w/api.php?action=query&origin=*&format=json&titles=${encodeURIComponent(
    selectedArticle
  )}&prop=extracts`;

  // Use the useFetch hook to fetch article data
  const {
    data,
    isLoading: isFetchLoading,
    isError: isFetchError,
  } = useFetch<WikipediaResponse>(apiUrl);

  // Update article state when data is available
  useEffect(() => {
    if (!isFetchLoading && !isFetchError && data) {
      const page = Object.values(data.query.pages)[0] as Article;
      setArticle(page);
      setIsLoading(false);
    } else if (isFetchError) {
      console.error(`Error fetching ${selectedLanguage} article.`);
      setIsLoading(false);
    }
  }, [data, isFetchLoading, isFetchError, selectedLanguage, selectedArticle]);

  // Define event handlers
  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
  };

  const handleArticleChange = (value: string) => {
    setSelectedArticle(value);
  };

  return (
    <div className="wikipedia-app">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1>Read by multiple languages</h1>
          <div className="article-container">
            <div className="articles-titles">
              <ul className="articles-list">
                {articles.map((articleItem) => (
                  <li
                    key={articleItem.value}
                    className={
                      selectedArticle === articleItem.value ? "selected" : ""
                    }
                    onClick={() => handleArticleChange(articleItem.value)}
                  >
                    <h2>{articleItem.title}</h2>
                  </li>
                ))}
              </ul>
            </div>
            <div className="tabs-container">
              <div className="languages-list">
                {languages.map((lang) => (
                  <div
                    key={lang.value}
                    className={`language-item ${
                      selectedLanguage === lang.value ? "active" : ""
                    }`}
                    onClick={() => handleLanguageChange(lang.value)}
                  >
                    <h2>{lang.name}</h2>
                  </div>
                ))}
              </div>

              <div className="article-content">
                <h2>{article?.title}</h2>
                <p
                  ref={extractRef}
                  className="extract"
                  dangerouslySetInnerHTML={{ __html: article?.extract || "" }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Languages;
