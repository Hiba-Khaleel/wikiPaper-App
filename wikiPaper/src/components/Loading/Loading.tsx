import loadingGif from "../../assets/images/wikilogo.gif";
import "./loading.css";
function Loading() {
  return (
    <div className="loading">
      <img src={loadingGif} alt="Loading..." />
    </div>
  );
}

export default Loading;
