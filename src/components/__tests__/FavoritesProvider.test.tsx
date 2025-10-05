import { render, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { FavoritesProvider } from "../../context/FavoritesProvider";
import {
  FavoritesContext,
  type FavoritesContextType,
} from "../../context/FavoritesContext";
import type { NewsApiArticle } from "../../services/newsService";

describe("FavoritesProvider", () => {
  const sampleArticle: NewsApiArticle = {
    source: { name: "TechCrunch" },
    author: "John Doe",
    title: "Breaking News",
    description: "Test description",
    url: "http://example.com/article",
    urlToImage: "http://example.com/image.jpg",
    publishedAt: "2025-10-04T12:00:00Z",
    content: "Some content",
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it("loads favorites from localStorage", () => {
    localStorage.setItem("favorites", JSON.stringify([sampleArticle]));

    let contextValue: FavoritesContextType | null | undefined;

    render(
      <FavoritesProvider>
        <FavoritesContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </FavoritesContext.Consumer>
      </FavoritesProvider>
    );

    expect(contextValue).toBeDefined();
    expect(contextValue!.favorites).toHaveLength(1);
    expect(contextValue!.favorites[0].title).toBe("Breaking News");
  });

  it("toggles favorites correctly", async () => {
    let contextValue: FavoritesContextType | null | undefined;

    render(
      <FavoritesProvider>
        <FavoritesContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </FavoritesContext.Consumer>
      </FavoritesProvider>
    );

    expect(contextValue).toBeDefined();

    contextValue!.toggleFavorite(sampleArticle);

    await waitFor(() => {
      expect(contextValue!.favorites).toHaveLength(1);
      expect(contextValue!.favorites[0].title).toBe("Breaking News");

      contextValue!.toggleFavorite(sampleArticle);
    });

    await waitFor(() => {
      expect(contextValue!.favorites).toHaveLength(0);
    });
  });

  it("updates localStorage when favorites change", async () => {
    let contextValue: FavoritesContextType | null | undefined;

    render(
      <FavoritesProvider>
        <FavoritesContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </FavoritesContext.Consumer>
      </FavoritesProvider>
    );

    expect(contextValue).toBeDefined();

    contextValue!.toggleFavorite(sampleArticle);

    await waitFor(() => {
      const stored = localStorage.getItem("favorites");
      expect(stored).not.toBeNull();
      const parsed = stored ? JSON.parse(stored) : [];
      expect(parsed).toHaveLength(1);
      expect(parsed[0].title).toBe("Breaking News");
    });
  });
});
