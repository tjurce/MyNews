import { render, screen } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import SearchResults from "../SearchResults/SearchResults";
import type { NewsApiArticle } from "../../services/newsService";

const mockArticles: NewsApiArticle[] = [
  {
    source: { name: "TechCrunch" },
    author: "John Doe",
    title: "Breaking News",
    description: "Some description",
    url: "http://example.com/article",
    urlToImage: "http://example.com/image.jpg",
    publishedAt: "2025-10-04T12:00:00Z",
    content: "Article content",
  },
];

vi.mock("../../services/newsService", () => ({
  fetchEverything: vi.fn(() => Promise.resolve(mockArticles)),
}));

vi.mock("react-router-dom", async () => {
  const actual: typeof import("react-router-dom") = await vi.importActual(
    "react-router-dom"
  );
  return {
    ...actual,
    useParams: () => ({ query: "React" }),
  };
});

describe("SearchResults component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the query title", () => {
    render(
      <MemoryRouter>
        <SearchResults />
      </MemoryRouter>
    );

    expect(screen.getByText("Search results for: React")).toBeInTheDocument();
  });

  it("fetches and displays articles", async () => {
    render(
      <MemoryRouter>
        <SearchResults />
      </MemoryRouter>
    );

    const title = await screen.findByText("Breaking News");
    const author = await screen.findByText("John Doe");

    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();
  });

  it("renders the correct number of articles", async () => {
    render(
      <MemoryRouter>
        <SearchResults />
      </MemoryRouter>
    );

    const articles = await screen.findAllByText(/Breaking News/i);
    expect(articles).toHaveLength(mockArticles.length);
  });
});
