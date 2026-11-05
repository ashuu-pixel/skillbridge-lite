
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import App from "./App";

describe("App Routing", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [
          {
            id: 1,
            title: "Frontend Developer Intern",
            company: "Tech Company",
            category: "Development",
            location: "Remote",
            type: "Internship",
            stipend: "Paid",
            description: "Learn frontend development."
          }
        ]
      })
    );
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    window.history.replaceState({}, "", "/");
  });

  test("renders the Home page", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: /find your dream internship/i
      })
    ).toBeInTheDocument();
  });

  test("navigates from Home to Explore", async () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("link", {
        name: /explore opportunities/i
      })
    );

    await waitFor(() => {
      expect(window.location.pathname).toBe("/opportunities");
    });

    expect(
      screen.queryByText(/404 — page not found/i)
    ).not.toBeInTheDocument();
  });

  test("renders the 404 page for an unknown route", () => {
    window.history.replaceState({}, "", "/unknown-page");

    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: /404 — page not found/i
      })
    ).toBeInTheDocument();
  });
});
