import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import BackToTopButton from "../../components/BackToTopBtn/BackBtn";
import "./random.css";

interface Image {
  ns: number;
  title: string;
}

interface Page {
  title: string;
  extract: string;
  images?: Image[];
}

interface WikipediaApiResponse {
  query: {
    pages: {
      [pageId: string]: Page;
    };
  };
}

const RandomArticlePage: React.FC = () => {
  const { title } = useParams<{ title: string }>();

  const [articleData, setArticleData] = useState<Page | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Fetch article details using the 'title' parameter
    const fetchArticleData = async () => {
      try {
        const response = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&origin=*&titles=${title}&format=json&prop=extracts`
        );
        const data: WikipediaApiResponse = await response.json();
        const page: Page = Object.values(data.query.pages)[0];

        setArticleData({
          title: page.title,
          extract: page.extract,
        });
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };

    // Fetch images for the article using the 'title' parameter
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&origin=*&titles=${title}&format=json&prop=images`
        );
        const data: WikipediaApiResponse = await response.json();
        const page = Object.values(data.query.pages)[0];
        if (page.images) {
          const imageTitles = page.images.map(
            (image: { title: string }) => image.title
          );
          setImages(imageTitles);
        } else {
          // Handle the case where 'page.images' is undefined
          console.error("No images found for the article.");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchArticleData();
    fetchImages();
  }, [title]);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Button onClick={goBack} text="go back" />

      <div className="article-container">
        {articleData ? (
          <>
            <h1>{articleData.title}</h1>
            <div
              className="extract"
              dangerouslySetInnerHTML={{ __html: articleData.extract }}
            />

            {images.length > 0 && (
              <div className="images-container">
                <h2>Images</h2>
                <ul>
                  {images.map((image, index) => (
                    <li key={index}>
                      <img
                        src={`https://en.wikipedia.org/wiki/Special:FilePath/${encodeURIComponent(
                          image
                        )}`}
                        alt={image}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
      <BackToTopButton />
    </>
  );
};

export default RandomArticlePage;
