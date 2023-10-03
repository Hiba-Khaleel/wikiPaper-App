import { useState, useEffect, useRef } from "react";
import Loading from "../../components/Loading/Loading";
import articlesData from "./articles.json";

import "./languages.css";

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

  // Define the fetchArticle function
  const fetchArticle = async () => {
    const apiUrl = `https://${selectedLanguage}.wikipedia.org/w/api.php?action=query&origin=*&format=json&titles=${encodeURIComponent(
      selectedArticle
    )}&prop=extracts`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const page = Object.values(data.query.pages)[0] as Article;
      setArticle(page);
      setIsLoading(false);
    } catch (error) {
      console.error(`Error fetching ${selectedLanguage} article:`, error);
      setIsLoading(false);
    }
  };

  // Fetch article data when selectedLanguage or selectedArticle changes
  useEffect(() => {
    fetchArticle();
  }, [selectedLanguage, selectedArticle]);

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
              <h2>Choose an Article</h2>
              <ul className="articles-list">
                {articles.map((articleItem) => (
                  <li
                    key={articleItem.value}
                    className={
                      selectedArticle === articleItem.value ? "selected" : ""
                    }
                    onClick={() => handleArticleChange(articleItem.value)}
                  >
                    {articleItem.title}
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
                    {lang.name}
                  </div>
                ))}
              </div>

              <div className="article-content">
                <h3>{article?.title}</h3>
                <div
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
