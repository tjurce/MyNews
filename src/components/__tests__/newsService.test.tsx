// src/services/__tests__/newsService.test.ts
import {
  fetchTopHeadlines,
  fetchTopHeadlinesByCategory,
  fetchEverything,
  fetchRecentNews,
  type NewsApiArticle,
} from "../../services/newsService";
import { vi, describe, it, expect, beforeEach } from "vitest";

const mockArticles: NewsApiArticle[] = [
  {
    source: { name: "TechCrunch" },
    author: "John Doe",
    title: "Breaking News",
    description: "Sample description",
    url: "http://example.com",
    urlToImage: "http://example.com/image.jpg",
    publishedAt: new Date().toISOString(),
    content: "Some content",
  },
];

describe("newsService", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("fetchTopHeadlines returns articles", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ articles: mockArticles }),
      } as Response)
    );

    const result = await fetchTopHeadlines();
    expect(result).toEqual(mockArticles);
    expect(fetch).toHaveBeenCalledOnce();
  });

  it("fetchTopHeadlinesByCategory returns articles", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ articles: mockArticles }),
      } as Response)
    );

    const result = await fetchTopHeadlinesByCategory("technology");
    expect(result).toEqual(mockArticles);
    expect(fetch).toHaveBeenCalledOnce();
  });

  it("fetchEverything returns articles", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ articles: mockArticles }),
      } as Response)
    );

    const result = await fetchEverything("react");
    expect(result).toEqual(mockArticles);
    expect(fetch).toHaveBeenCalledOnce();
  });

  it("fetchRecentNews returns articles", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ articles: mockArticles }),
      } as Response)
    );

    const result = await fetchRecentNews(1);
    expect(result).toEqual(mockArticles);
    expect(fetch).toHaveBeenCalledOnce();
  });

  it("handles fetch failure gracefully", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
      } as Response)
    );

    const result = await fetchTopHeadlines();
    expect(result).toEqual([]);
  });
});
