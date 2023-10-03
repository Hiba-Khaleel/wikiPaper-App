import { Outlet } from "react-router-dom";
import Header from "../components/Navigation/Header";
import SpaceBackground from "../components/stars/stars";
import Footer from "../components/Footer/Footer";
import "./../App.css";

export default function RootLayout() {
  return (
    <div className="root-container">
      <SpaceBackground></SpaceBackground>
      <Header></Header>
      <div className="content-container">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
}
