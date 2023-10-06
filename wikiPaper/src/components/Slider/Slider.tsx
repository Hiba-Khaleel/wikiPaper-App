import { useState, useEffect, useCallback } from "react";
import "./slider.css";

interface TextSliderProps {
  textArray: string[];
}

const TextSlider: React.FC<TextSliderProps> = ({ textArray }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextIndex = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === textArray.length - 1 ? 0 : prevIndex + 1
    );
  }, [textArray]);

  useEffect(() => {
    const interval = setInterval(nextIndex, 3000); // Change slides every 3 seconds (adjust as needed)

    return () => {
      clearInterval(interval);
    };
  }, [nextIndex]);

  return (
    <div className="text-slider">
      <div className="slider-content">
        {textArray.map((text, index) => (
          <p key={index} className={index === currentIndex ? "active" : ""}>
            {text}
          </p>
        ))}
      </div>
      <div className="slider-dots">
        {textArray.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? "active" : ""}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default TextSlider;
