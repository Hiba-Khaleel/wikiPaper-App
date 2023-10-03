import { useState, useEffect } from "react";

export default function Trend() {
  const [topArticles, setTopArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopArticles() {
      try {
        const response = await fetch(
          "https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/2019/09/20"
        );

        if (response.ok) {
          const data = await response.json();
          const validArticles = data.items[0].articles
            .filter((article) => !article.article.includes(":")) // Filter out non-article entries
            .slice(0, 20); // Limit to top 20 articles
          setTopArticles(validArticles);
          setLoading(false);
        } else {
          console.error("Failed to fetch data");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }

    fetchTopArticles();
  }, []);

  return (
    <div>
      <h2>Top 20 Most Viewed Articles</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {topArticles.map((article, index) => (
            <li key={index}>
              <strong>
                <a
                  href={`https://en.wikipedia.org/wiki/${encodeURIComponent(
                    article.article
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.article}
                </a>
              </strong>{" "}
              - Views: {article.views}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
