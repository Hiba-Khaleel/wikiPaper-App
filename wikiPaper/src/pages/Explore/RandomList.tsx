import React, { useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import WikiSearch from "./WikiSearch/WikiSearch";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

import "./random.css";

interface Image {
  ns: number;
  title: string;
}

interface Article {
  title: string;
  extract: string;
  images: Image[];
}

const ExplorePage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRandomArticles = async () => {
    try {
      const response = await fetch(
        "https://en.wikipedia.org/w/api.php?action=query&origin=*&generator=random&format=json&grnnamespace=0&prop=extracts|images&pithumbsize=2000&grnlimit=12"
      );
      const data = await response.json();
      const pages = data.query.pages;
      const randomArticles = Object.keys(pages).map((key) => {
        const randomArticlePage = pages[key];
        const images: Image[] = randomArticlePage.images || [];
        return {
          title: randomArticlePage.title,
          extract: randomArticlePage.extract,
          images: images,
        };
      });

      setArticles(randomArticles);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching random articles:", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchRandomArticles();
    // Fetch new random articles every minute
    const interval = setInterval(fetchRandomArticles, 60000);
    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);

  const getDefaultImage = () => {
    // Return the URL of your default image
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Wikipedia_logo_%28svg%29.svg/2048px-Wikipedia_logo_%28svg%29.svg.png";
  };

  return (
    <>
      <WikiSearch />
      <Button
        onClick={fetchRandomArticles}
        text="generate new"
        className="generateBtn"
      />

      <div className="random-articles-container">
        {isLoading ? (
          <Loading />
        ) : (
          articles.map((article, index) => (
            <div key={index} className="random-Card">
              <div className="random-article-content">
                {article.images.length > 0 ? (
                  <img
                    src={`https://en.wikipedia.org/wiki/Special:FilePath/${encodeURIComponent(
                      article.images[0].title
                    )}`}
                    alt={article.images[0].title}
                  />
                ) : (
                  <img src={getDefaultImage()} alt="Default" />
                )}
              </div>
              <h2>{article.title}</h2>
              <Link
                to={`/exploreArticles/${article.title}`}
                className="learn-More"
              >
                Read More
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ExplorePage;
