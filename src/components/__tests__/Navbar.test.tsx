import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../Navbar/Navbar";
import { vi } from "vitest";
import * as vitest from "vitest";
import { useNavigate } from "react-router-dom";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("Navbar component", () => {
  const mockNavigate = vi.fn();
  const mockOnSelectCategory = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as unknown as vitest.Mock).mockReturnValue(mockNavigate);
  });

  it("renders all navigation items", () => {
    render(<Navbar onSelectCategory={mockOnSelectCategory} />);

    const navLabels = [
      "Home",
      "General",
      "Business",
      "Health",
      "Science",
      "Sports",
      "Technology",
      "Favorites",
    ];

    navLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("highlights the active item", () => {
    render(<Navbar onSelectCategory={mockOnSelectCategory} />);

    const homeItem = screen.getByText("Home").parentElement;
    expect(homeItem).toHaveClass("navbar__item--active");

    const generalItem = screen.getByText("General").parentElement;
    expect(generalItem).not.toHaveClass("navbar__item--active");
  });

  it("calls onSelectCategory and navigate when an item is clicked", () => {
    render(<Navbar onSelectCategory={mockOnSelectCategory} />);

    const businessItem = screen.getByText("Business").parentElement!;
    fireEvent.click(businessItem);

    expect(mockOnSelectCategory).toHaveBeenCalledWith("Business");
    expect(mockNavigate).toHaveBeenCalledWith("/");

    expect(businessItem).toHaveClass("navbar__item--active");
  });

  it("applies mobile class when isOpen is true", () => {
    const { container } = render(
      <Navbar onSelectCategory={mockOnSelectCategory} isOpen />
    );

    const nav = container.querySelector("nav");
    expect(nav).toHaveClass("navbar--mobile-open");
  });
});
