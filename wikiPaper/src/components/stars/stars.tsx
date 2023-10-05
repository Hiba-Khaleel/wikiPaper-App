import "./stars.css";
import { useContext } from "react";
import { ThemeContext } from "../Hooks/ThemeContext";

const SpaceBackground = () => {
  const context = useContext(ThemeContext);
  const theme = context?.theme;

  const spaceBackgroundStyle = {
    background: theme === "dark" ? "#000" : "#fff",
  };
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 100; i++) {
      const size = Math.random() * 2;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const animationDelay = Math.random() * 2;
      stars.push(
        <div
          key={i}
          className="star"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${animationDelay}s`,
          }}
        ></div>
      );
    }
    return stars;
  };

  return (
    <div className="space-background" style={spaceBackgroundStyle}>
      {generateStars()}
    </div>
  );
};

export default SpaceBackground;
