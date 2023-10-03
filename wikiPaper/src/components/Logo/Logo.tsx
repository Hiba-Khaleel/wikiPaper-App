import WikipediaLogo from "../../assets/images/Wikipedia.gif";
import "./logo.css";

export default function Logo() {
  return (
    <div>
      <img src={WikipediaLogo} alt="Wikipedia Logo" className="animated-logo" />
    </div>
  );
}
