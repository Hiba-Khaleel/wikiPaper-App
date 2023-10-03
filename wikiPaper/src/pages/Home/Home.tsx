import Logo from "../../components/Logo/Logo.tsx";
//import Trend from "../Trend/Trend.tsx";

import "./Home.css";
const HomePage: React.FC = () => {
  return (
    <>
      <div className="homePageContent">
        <Logo />
        <p>
          Join us on this literary adventure as we turn pages, open new
          chapters, and embrace the stories that enrich our lives. Let's embark
          on this exploration of the written word, one page at a time.
        </p>
      </div>
    </>
  );
};

export default HomePage;
