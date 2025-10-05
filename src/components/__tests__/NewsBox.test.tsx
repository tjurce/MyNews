import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NewsBox from "../NewsBox/NewsBox";
import { vi, beforeEach, describe, it, expect } from "vitest";
import type { NewsApiArticle } from "../../services/newsService";
import * as newsService from "../../services/newsService";

const mockArticles: NewsApiArticle[] = [
  {
    source: { name: "Test Source" },
    author: "Author 1",
    title: "Test Article 1",
    description: "Desc 1",
    url: "http://test1.com",
    urlToImage: null,
    publishedAt: new Date().toISOString(),
    content: "Content 1",
  },
  {
    source: { name: "Test Source" },
    author: "Author 2",
    title: "Test Article 2",
    description: "Desc 2",
    url: "http://test2.com",
    urlToImage: null,
    publishedAt: new Date().toISOString(),
    content: "Content 2",
  },
];

vi.mock("../../services/newsService", () => ({
  fetchRecentNews: vi.fn(),
}));

const mockedFetchRecentNews = vi.mocked(newsService.fetchRecentNews);

class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}
window.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver;

describe("NewsBox component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders title and icons", () => {
    mockedFetchRecentNews.mockResolvedValue([]);
    render(
      <MemoryRouter>
        {" "}
        <NewsBox />
      </MemoryRouter>
    );
    expect(screen.getByText("Latest News")).toBeInTheDocument();
    expect(screen.getByAltText("Outer oval")).toBeInTheDocument();
    expect(screen.getByAltText("Interior oval")).toBeInTheDocument();
  });

  it("fetches and displays articles", async () => {
    mockedFetchRecentNews.mockResolvedValue(mockArticles);

    render(
      <MemoryRouter>
        <NewsBox />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading more news...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Test Article 1")).toBeInTheDocument();
      expect(screen.getByText("Test Article 2")).toBeInTheDocument();
    });

    expect(screen.queryByText("Loading more news...")).not.toBeInTheDocument();
  });

  it("displays 'No more news available' when no articles left", async () => {
    mockedFetchRecentNews.mockResolvedValue([]);

    render(
      <MemoryRouter>
        <NewsBox />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("No more news available")).toBeInTheDocument();
    });
  });
});
