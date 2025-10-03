import { useState } from "react";
import { Routes, Route } from "react-router-dom";
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

  return (
    <div className="app-container">
      <FavoritesProvider>
        <Header />
        <Logo onHamburgerClick={() => setMenuOpen(!isMenuOpen)} />
        <SearchBar />
        <Divider width="1095px" height="1px" color="#979797" />

        <Navbar onSelectCategory={setSelectedCategory} isOpen={isMenuOpen} />

        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* Desktop layout (hidden if menu open) */}
                {!isMenuOpen && (
                  <div className="desktop-layout">
                    <NewsBox />
                    <Board categoryTitle={selectedCategory} />
                  </div>
                )}

                {/* Mobile layout (hidden if menu open) */}
                {!isMenuOpen && (
                  <div className="mobile-layout">
                    <div className="mobile-tabs">
                      <button
                        className={`mobile-tabs__btn ${
                          mobileTab === "featured" ? "active" : ""
                        }`}
                        onClick={() => setMobileTab("featured")}
                      >
                        Featured
                      </button>
                      <button
                        className={`mobile-tabs__btn ${
                          mobileTab === "latest" ? "active" : ""
                        }`}
                        onClick={() => setMobileTab("latest")}
                      >
                        Latest
                      </button>
                    </div>

                    {mobileTab === "featured" ? (
                      <Board categoryTitle={selectedCategory} />
                    ) : (
                      <NewsBox />
                    )}
                  </div>
                )}
              </>
            }
          />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/search/:query" element={<SearchResults />} />
        </Routes>
      </FavoritesProvider>
    </div>
  );
}

export default App;
