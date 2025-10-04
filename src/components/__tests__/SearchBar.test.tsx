import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import SearchBar from "../SearchBar/SearchBar";

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

describe("SearchBar component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders input and button", () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText("Search news")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("updates input value when typing", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      "Search news"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "React" } });
    expect(input.value).toBe("React");
  });

  it("calls navigate with correct path on button click", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      "Search news"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "React" } });

    const button = screen.getByText("Search");
    fireEvent.click(button);

    expect(mockedNavigate).toHaveBeenCalledWith("/search/React");
  });

  it("calls navigate with correct path when pressing Enter", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(
      "Search news"
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Vitest" } });

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(mockedNavigate).toHaveBeenCalledWith("/search/Vitest");
  });

  it("does not call navigate if input is empty", () => {
    render(<SearchBar />);
    const button = screen.getByText("Search");
    fireEvent.click(button);
    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  it("applies menu open class when isMenuOpen is true", () => {
    const { container } = render(<SearchBar isMenuOpen />);
    expect(container.firstChild).toHaveClass("search--menu-open");
  });
});
