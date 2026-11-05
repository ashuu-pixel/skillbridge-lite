
import { renderHook, act, waitFor } from "@testing-library/react";
import useOpportunityFilters from "./useOpportunityFilters";

const opportunities = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions",
    category: "Development"
  },
  {
    id: 2,
    title: "UI UX Designer",
    company: "Creative Studio",
    category: "Design"
  },
  {
    id: 3,
    title: "React Developer",
    company: "Web Company",
    category: "Development"
  },
  ...Array.from({ length: 6 }, (_, index) => ({
    id: index + 4,
    title: `Internship ${index + 4}`,
    company: "Test Company",
    category: "Development"
  }))
];

describe("useOpportunityFilters", () => {
  test("filters opportunities by search keyword", async () => {
    const { result } = renderHook(() =>
      useOpportunityFilters(opportunities)
    );

    act(() => {
      result.current.setSearch("Frontend");
    });

    await waitFor(() => {
      expect(result.current.filteredOpportunities).toHaveLength(1);
      expect(result.current.filteredOpportunities[0].title)
        .toBe("Frontend Developer");
    });
  });

  test("filters opportunities by category", () => {
    const { result } = renderHook(() =>
      useOpportunityFilters(opportunities)
    );

    act(() => {
      result.current.setCategory("Design");
    });

    expect(result.current.filteredOpportunities).toHaveLength(1);
    expect(result.current.filteredOpportunities[0].title)
      .toBe("UI UX Designer");
  });

  test("loads more opportunities when requested", () => {
    const { result } = renderHook(() =>
      useOpportunityFilters(opportunities)
    );

    expect(result.current.visibleOpportunities).toHaveLength(6);

    act(() => {
      result.current.loadMore();
    });

    expect(result.current.visibleOpportunities).toHaveLength(9);
  });
});
