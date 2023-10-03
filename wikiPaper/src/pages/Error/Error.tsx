import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";
import "./error.css";

function Error() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  console.log("Error component rendered");
  return (
    <div className="error-Container">
      <Loading />
      <h1>Error</h1>
      <p>Something went wrong </p>
      <Button onClick={goBack} text="Go back to previous page " />
    </div>
  );
}
export default Error;
