
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, afterEach, describe, expect, test, vi } from "vitest";
import useOpportunities from "./useOpportunities";

describe("useOpportunities", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("starts with loading state", () => {
    fetch.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useOpportunities());

    expect(result.current.loading).toBe(true);
    expect(result.current.opportunities).toEqual([]);
  });

  test("loads opportunities successfully", async () => {
    const mockData = [
      {
        id: 1,
        title: "Frontend Developer",
        company: "Tech Company"
      },
      {
        id: 2,
        title: "UI UX Designer",
        company: "Design Studio"
      }
    ];

    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockData
    });

    const { result } = renderHook(() => useOpportunities());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.opportunities).toEqual(mockData);
    expect(result.current.error).toBe("");
  });

  test("shows error when fetching fails", async () => {
    fetch.mockResolvedValue({
      ok: false
    });

    const { result } = renderHook(() => useOpportunities());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(
      "Unable to load opportunities. Please try again."
    );
    expect(result.current.opportunities).toEqual([]);
  });
});
