import WikiCommons from "../../assets/images/wikiCommons.gif";
import TextSlider from "../../components/Slider/Slider";

import "./Home.css";
const HomePage: React.FC = () => {
  const textArray = [
    "Immerse yourself in daily events from around the world with our DayEvent page. Stay updated with the latest news, cultural highlights, and noteworthy occurrences as they happen. From celebrations to historical milestones, explore the vibrant tapestry of life's daily events.",
    "Embark on a journey of knowledge with our Explore page. Delve into a treasure trove of articles covering a wide array of topics. From science and history to arts and culture, our Explore page offers a diverse range of articles to satisfy your curiosity. Unearth insights, expand your horizons, and indulge your thirst for knowledge.",
    "Unlock the power of language with our Read in Multiple Languages feature. Experience the joy of learning and reading in a language that resonates with you. With translations available in numerous languages, this page ensures that knowledge knows no boundaries. Explore, learn, and connect with the world through the richness of languages.",
  ];
  return (
    <>
      <div className="about">
        <img src={WikiCommons} alt="WikiCommons" />
        <h1>welcome to reading journey</h1>
        <p>
          EXPLORE<span> - </span>READ<span> - </span> LEARN
        </p>
        <div className="content">
          <TextSlider textArray={textArray} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
