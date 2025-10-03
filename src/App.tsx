import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.scss";
import Board from "./components/Board/Board";
import Divider from "./components/Divider/Divider";
import Header from "./components/Header/Header";
import Logo from "./components/Logo/Logo";
import Navbar from "./components/Navbar/Navbar";
import NewsBox from "./components/NewsBox/NewsBox";
import SearchBar from "./components/SearchBar/SearchBar";
import Article from "./components/Article/Article";
import SearchResults from "./components/SearchResults/SearchResults";
import { FavoritesProvider } from "./context/FavoritesProvider";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("Home");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<"featured" | "latest">("featured");

  const location = useLocation();

  // Reset category to default when navigating back to home
  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedCategory("Home");
      setMobileTab("featured");
    }
  }, [location.pathname]);

  return (
    <div className="app-container">
      <FavoritesProvider>
        <Header />
        <Logo onHamburgerClick={() => setMenuOpen(!isMenuOpen)} />
        <SearchBar />
        <Divider width="1095px" height="1px" color="#979797" />
        <Navbar
          onSelectCategory={(category) => {
            setSelectedCategory(category);
            setMenuOpen(false);
            setMobileTab("featured");
          }}
          isOpen={isMenuOpen}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {!isMenuOpen && (
                  <>
                    {/* Desktop layout */}
                    <div className="desktop-layout">
                      <NewsBox />
                      <Board categoryTitle={selectedCategory} />
                    </div>

                    {/* Mobile layout */}
                    <div className="mobile-layout">
                      <div className="mobile-tabs">
                        <button
                          className={`mobile-tabs__btn featured-btn ${
                            mobileTab === "featured" ? "active" : ""
                          }`}
                          onClick={() => setMobileTab("featured")}
                        >
                          Featured
                        </button>
                        <button
                          className={`mobile-tabs__btn latest-btn ${
                            mobileTab === "latest" ? "active" : ""
                          }`}
                          onClick={() => setMobileTab("latest")}
                        >
                          Latest
                        </button>
                      </div>

                      <div className="mobile-content">
                        {mobileTab === "featured" && (
                          <Board categoryTitle={selectedCategory} />
                        )}
                        {mobileTab === "latest" && <NewsBox />}
                      </div>
                    </div>
                  </>
                )}
              </>
            }
          />

          <Route
            path="/article/:slug"
            element={!isMenuOpen ? <Article /> : null}
          />
          <Route
            path="/search/:query"
            element={!isMenuOpen ? <SearchResults /> : null}
          />
        </Routes>
      </FavoritesProvider>
    </div>
  );
}

export default App;
