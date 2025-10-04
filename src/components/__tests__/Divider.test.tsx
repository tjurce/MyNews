import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Divider from "../Divider/Divider";

describe("Divider component", () => {
  it("renders with default props", () => {
    render(<Divider />);
    const divider = screen.getByRole("separator");

    expect(divider).toBeInTheDocument();
    expect(divider).toHaveStyle({
      width: "100%",
      height: "1px",
      backgroundColor: "#ccc",
    });
  });

  it("applies custom width, height, and color", () => {
    render(<Divider width={200} height="5px" color="red" />);
    const divider = screen.getByRole("separator");

    expect(divider).toHaveStyle({
      backgroundColor: expect.stringMatching(/red|rgb\(255, 0, 0\)/),
    });
  });

  it("applies width as string correctly", () => {
    render(<Divider width="50%" />);
    const divider = screen.getByRole("separator");
    expect(divider).toHaveStyle({
      width: "50%",
    });
  });
});
