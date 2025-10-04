import { render, screen, fireEvent } from "@testing-library/react";
import NewsItem from "../NewsItem/NewsItem";
import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock react-router-dom useNavigate
const mockedNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual: typeof import("react-router-dom") = await vi.importActual(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

const sampleArticle = {
  source: { name: "TechCrunch" },
  author: "John Doe",
  title: "Breaking News",
  urlToImage: "http://example.com/image.jpg",
  content: "Some content",
};

describe("NewsItem component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders article info correctly", () => {
    render(<NewsItem article={sampleArticle} />);

    expect(screen.getByText("TechCrunch")).toBeInTheDocument();
    expect(screen.getByText("Breaking News")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    const img = screen.getByAltText("Breaking News") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe("http://example.com/image.jpg");
  });

  it("displays 'Unknown' if author is null", () => {
    const article = { ...sampleArticle, author: null };
    render(<NewsItem article={article} />);

    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  it("calls navigate with correct path and state when clicked", () => {
    render(<NewsItem article={sampleArticle} />);

    const item = screen.getByText("Breaking News").closest("div");
    expect(item).toBeInTheDocument();

    if (!item) throw new Error("News item container not found");
    fireEvent.click(item);

    const expectedSlug = encodeURIComponent(
      `${sampleArticle.title}-${sampleArticle.source.name}`
    );
    expect(mockedNavigate).toHaveBeenCalledWith(`/article/${expectedSlug}`, {
      state: { article: sampleArticle },
    });
  });

  it("does not render image if urlToImage is null", () => {
    const article = { ...sampleArticle, urlToImage: null };
    render(<NewsItem article={article} />);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
