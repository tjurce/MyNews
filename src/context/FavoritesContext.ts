import { createContext } from "react";
import type { NewsApiArticle } from "../services/newsService";

export interface FavoritesContextType {
    favorites: NewsApiArticle[];
    toggleFavorite: (article: NewsApiArticle) => void;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
