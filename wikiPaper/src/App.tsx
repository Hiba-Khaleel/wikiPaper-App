import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./pages/About/About";
import HomePage from "./pages/Home/Home";
import RootLayout from "./pages/Root";
import Error from "./pages/Error/Error";
import EventDisplay from "./pages/dayEvent/DayEvent";
import EventDetails from "./pages/dayEvent/DayArticle";
import ExplorePage from "./pages/Explore/random2";
import Languages from "./pages/TransulatedArticles/TransulatedArticle";
import RandomArticlePage from "./pages/Explore/RAricle";
import { ThemeProvider } from "./components/Hooks/ThemeContext";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <HomePage /> },

      {
        path: "dayEvent",
        element: <EventDisplay />,
        children: [
          {
            path: "dayEvent/:title",
            element: <EventDetails />,
          },
        ],
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "Languages",
        element: <Languages />,
      },
      {
        path: "exploreArticles",
        element: <ExplorePage />,
      },
      {
        path: "exploreArticles/:title",
        element: <RandomArticlePage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
