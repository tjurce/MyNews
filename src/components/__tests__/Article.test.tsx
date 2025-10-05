import { describe, it, expect, beforeEach } from "vitest";
import * as vitest from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Article from "../Article/Article";
import { useFavorites } from "../../context/useFavorites";
import { useLocation } from "react-router-dom";

vi.mock("../../context/useFavorites");
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

const mockArticle = {
  title: "Test Article",
  content: "This is the article content [+123 chars]",
  author: "John Doe",
  url: "https://example.com/test-article",
  urlToImage: "https://example.com/image.jpg",
};

describe("Article component", () => {
  const toggleFavorite = vi.fn();

  beforeEach(() => {
    (useFavorites as unknown as vitest.Mock).mockReturnValue({
      favorites: [],
      toggleFavorite,
    });

    (useLocation as unknown as vitest.Mock).mockReturnValue({
      state: { article: mockArticle },
    });

    toggleFavorite.mockClear();
  });

  it("renders article title, author, content and image", () => {
    render(
      <MemoryRouter>
        <Article />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Article")).toBeInTheDocument();
    expect(screen.getByText("By John Doe")).toBeInTheDocument();
    expect(screen.getByText("This is the article content")).toBeInTheDocument();
    expect(screen.getByAltText("Test Article")).toHaveAttribute(
      "src",
      mockArticle.urlToImage
    );
    expect(screen.getByText("Full article")).toHaveAttribute(
      "href",
      mockArticle.url
    );
  });

  it("calls toggleFavorite when favorite button is clicked", () => {
    render(
      <MemoryRouter>
        <Article />
      </MemoryRouter>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(toggleFavorite).toHaveBeenCalledWith(mockArticle);
  });
});
