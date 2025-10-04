import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header/Header";
import { vi } from "vitest";

describe("Header component", () => {
  beforeEach(() => {
    vi.restoreAllMocks(); // Reset mocks before each test
  });

  it("renders the title, description, and buttons", () => {
    render(<Header />);

    expect(screen.getByText("Make MyNews your homepage")).toBeInTheDocument();
    expect(
      screen.getByText("Every day discover what’s trending on the internet!")
    ).toBeInTheDocument();

    expect(screen.getByText("No, thanks")).toBeInTheDocument();
    expect(screen.getByText("GET")).toBeInTheDocument();
  });

  it("hides the header when 'No, thanks' button is clicked", () => {
    render(<Header />);

    const discardButton = screen.getByText("No, thanks");
    fireEvent.click(discardButton);

    expect(screen.queryByText("Make MyNews your homepage")).toBeNull();
    expect(screen.queryByText("GET")).toBeNull();
  });

  it("calls alert and hides the header when 'GET' button is clicked", () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    render(<Header />);

    const getButton = screen.getByText("GET");
    fireEvent.click(getButton);

    expect(alertMock).toHaveBeenCalled();
    expect(screen.queryByText("Make MyNews your homepage")).toBeNull();
  });
});
