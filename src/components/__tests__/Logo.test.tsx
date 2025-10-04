import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Logo from "../Logo/Logo";
import { describe, it, expect, vi } from "vitest";

describe("Logo component", () => {
  it("renders MyNews text", () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );
    expect(screen.getByText("My")).toBeInTheDocument();
    expect(screen.getByText("News")).toBeInTheDocument();
  });

  it("calls onHamburgerClick when hamburger is clicked", () => {
    const handleClick = vi.fn();
    render(
      <MemoryRouter>
        <Logo onHamburgerClick={handleClick} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
