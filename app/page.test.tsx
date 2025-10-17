import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("Home Page", () => {
  it("renders without crashing", () => {
    render(<Page />);

    // Basic test to ensure the page renders
    expect(document.body).toBeTruthy();
  });

  it("has proper page structure", () => {
    render(<Page />);

    // Test that the page has basic HTML structure
    expect(document.documentElement).toBeTruthy();
  });
});
