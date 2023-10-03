import { NavLink, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { ThemeContext, ThemeContextType } from "../Hooks/ThemeContext";

import "./header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  //const { theme, toggleTheme } = useContext<ThemeContextType>(ThemeContext);
  const context = useContext<ThemeContextType | undefined>(ThemeContext);

  // Check if context is null or undefined
  if (context === null || context === undefined) {
    return null;
  }

  const { theme, toggleTheme } = context;

  const closeMenu = () => {
    setIsOpen(false);
  };

  const hamburger = isOpen ? "line line-rotate" : "line";

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <header>
      <div className="theme-switch" onClick={handleThemeToggle}>
        <span className="theme-icon">{theme === "dark" ? "☀️" : "🌑"}</span>
      </div>
      <nav className="nav">
        <NavLink className="nav__item" to="/">
          <h2>WikiPaper</h2>
        </NavLink>

        <div
          className="menu"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span className={hamburger}></span>
          <span className={hamburger}></span>
          <span className={hamburger}></span>
        </div>
        <ul className={isOpen ? "nav__list open" : "nav__list"}>
          <li className="nav__item">
            <NavLink
              to="/"
              className={location.pathname === "/" ? "active" : "nav__link"}
              onClick={closeMenu}
            >
              Home
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/about"
              className={
                location.pathname === "/about" ? "active" : "nav__link"
              }
              onClick={closeMenu}
            >
              About
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/dayEvent"
              className={
                location.pathname === "/dayEvent" ? "active" : "nav__link"
              }
              onClick={closeMenu}
            >
              Day's Event
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/exploreArticles"
              className={
                location.pathname === "/exploreArticles"
                  ? "active"
                  : "nav__link"
              }
              onClick={closeMenu}
            >
              Explore
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink
              to="/Languages"
              className={
                location.pathname === "/Languages" ? "active" : "nav__link"
              }
              onClick={closeMenu}
            >
              Languages
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
