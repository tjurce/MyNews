// src/components/__tests__/Board.test.tsx
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Board from "../Board/Board";
import { MemoryRouter } from "react-router-dom";
import type { NewsApiArticle } from "../../services/newsService";

// Mock articles matching full NewsApiArticle interface
const mockArticles: NewsApiArticle[] = [
  {
    source: { name: "Source 1" },
    author: "Author 1",
    title: "Article 1",
    description: "Description 1",
    url: "url1",
    urlToImage: null,
    publishedAt: "2025-10-04T00:00:00Z",
    content: "Content 1",
  },
  {
    source: { name: "Source 2" },
    author: "Author 2",
    title: "Article 2",
    description: "Description 2",
    url: "url2",
    urlToImage: null,
    publishedAt: "2025-10-04T00:00:00Z",
    content: "Content 2",
  },
  {
    source: { name: "Source 3" },
    author: "Author 3",
    title: "Article 3",
    description: "Description 3",
    url: "url3",
    urlToImage: null,
    publishedAt: "2025-10-04T00:00:00Z",
    content: "Content 3",
  },
  {
    source: { name: "Source 4" },
    author: "Author 4",
    title: "Article 4",
    description: "Description 4",
    url: "url4",
    urlToImage: null,
    publishedAt: "2025-10-04T00:00:00Z",
    content: "Content 4",
  },
  {
    source: { name: "Source 5" },
    author: "Author 5",
    title: "Article 5",
    description: "Description 5",
    url: "url5",
    urlToImage: null,
    publishedAt: "2025-10-04T00:00:00Z",
    content: "Content 5",
  },
];

// Mock services
vi.mock("../../services/newsService", () => ({
  fetchTopHeadlines: vi.fn(async () => mockArticles),
  fetchTopHeadlinesByCategory: vi.fn(async () => mockArticles),
}));

// Mock context
vi.mock("../../context/useFavorites", () => ({
  useFavorites: () => ({
    favorites: mockArticles.slice(0, 2), // first 2 as favorites
  }),
}));

describe("Board component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the category title correctly", () => {
    render(
      <MemoryRouter>
        <Board categoryTitle="Home" />
      </MemoryRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders articles in the two-col and three-col layout", async () => {
    render(
      <MemoryRouter>
        <Board categoryTitle="Home" />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Article 1")).toBeInTheDocument();
    });

    // First four should be in board__two-col
    const twoCol = document.querySelector(".board__two-col");
    expect(twoCol?.textContent).toContain("Article 1");
    expect(twoCol?.textContent).toContain("Article 4");

    // Rest should be in board__three-col
    const threeCol = document.querySelector(".board__three-col");
    expect(threeCol?.textContent).toContain("Article 5");
  });

  it("renders favorites when categoryTitle is 'Favorites'", async () => {
    render(
      <MemoryRouter>
        <Board categoryTitle="Favorites" />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Article 1")).toBeInTheDocument();
      expect(screen.getByText("Article 2")).toBeInTheDocument();
    });

    // Should only render favorites
    expect(screen.queryByText("Article 3")).not.toBeInTheDocument();
  });

  it("calls fetchTopHeadlinesByCategory for other categories", async () => {
    const { fetchTopHeadlinesByCategory } = await import(
      "../../services/newsService"
    );

    render(
      <MemoryRouter>
        <Board categoryTitle="Business" />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(fetchTopHeadlinesByCategory).toHaveBeenCalledWith("business");
    });
  });
});
