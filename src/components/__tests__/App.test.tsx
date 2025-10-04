import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";
import { describe, it, expect } from "vitest";

describe("App component", () => {
  it("renders the logo and header", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("My")).toBeInTheDocument();
    expect(screen.getByText("News")).toBeInTheDocument();
  });
});
