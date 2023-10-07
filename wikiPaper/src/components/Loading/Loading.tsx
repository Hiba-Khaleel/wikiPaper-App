import loading from "../../assets/images/loading.gif";
import "./loading.css";
function Loading() {
  return (
    <div className="loading">
      <img src={loading} alt="Loading..." />
    </div>
  );
}

export default Loading;
