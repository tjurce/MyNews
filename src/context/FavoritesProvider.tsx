import { useState, useEffect, type ReactNode } from "react";
import type { NewsApiArticle } from "../services/newsService";
import {
  FavoritesContext,
  type FavoritesContextType,
} from "./FavoritesContext";

interface Props {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useState<NewsApiArticle[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setFavorites(parsed);
      } catch (err) {
        console.error("Failed to parse favorites from localStorage:", err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (article: NewsApiArticle) => {
    setFavorites((prev) => {
      const exists = prev.find((a) => a.url === article.url);
      if (exists) {
        return prev.filter((a) => a.url !== article.url);
      } else {
        return [...prev, article];
      }
    });
  };

  const value: FavoritesContextType = { favorites, toggleFavorite };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
