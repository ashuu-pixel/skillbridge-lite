
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import Apply from "./Apply";

describe("Apply Form Validation", () => {
  beforeEach(() => {
    localStorage.clear();

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
            location: "Remote"
          }
        ]
      })
    );
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  function renderApplyPage() {
    return render(
      <MemoryRouter initialEntries={["/opportunities/1/apply"]}>
        <Routes>
          <Route
            path="/opportunities/:id/apply"
            element={<Apply />}
          />
        </Routes>
      </MemoryRouter>
    );
  }

  test("shows validation errors when form is empty", async () => {
    renderApplyPage();

    const submitButton = await screen.findByRole("button", {
      name: /submit application/i
    });

    fireEvent.click(submitButton);

    expect(
      await screen.findByText("Please enter your full name.")
    ).toBeInTheDocument();

    expect(screen.getByText("Please enter your email."))
      .toBeInTheDocument();

    expect(screen.getByText("Please enter your phone number."))
      .toBeInTheDocument();

    expect(screen.getByText("Please tell us about yourself."))
      .toBeInTheDocument();
  });

  test("rejects an invalid email address", async () => {
    renderApplyPage();

    await screen.findByRole("button", {
      name: /submit application/i
    });

    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "Test User" }
    });

    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "invalid-email" }
    });

    fireEvent.change(screen.getByLabelText("Phone Number"), {
      target: { value: "+923001234567" }
    });

    fireEvent.change(screen.getByLabelText("Why are you interested?"), {
      target: { value: "I want to learn new skills." }
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /submit application/i
      })
    );

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid email address.")
      ).toBeInTheDocument();
    });

    expect(localStorage.getItem("skillbridge-applications")).toBeNull();
  });
});
