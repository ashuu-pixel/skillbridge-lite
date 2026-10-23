
import { useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 6;

export default function useOpportunityFilters(opportunities) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Wait 350ms after the user stops typing.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim().toLowerCase());
    }, 350);

    return () => clearTimeout(timer);
  }, [search]);

  // Derive filtered results without changing the original API data.
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((item) => {
      const searchableText = [
        item.title,
        item.company,
        item.description,
        item.location,
        item.category,
        item.type,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !debouncedSearch || searchableText.includes(debouncedSearch);

      const matchesCategory =
        category === "All" || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [opportunities, debouncedSearch, category]);

  // Reset pagination whenever the active filters change.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [debouncedSearch, category]);

  const visibleOpportunities = useMemo(() => {
    return filteredOpportunities.slice(0, visibleCount);
  }, [filteredOpportunities, visibleCount]);

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        opportunities
          .map((item) => item.category)
          .filter(Boolean)
      ),
    ];
  }, [opportunities]);

  const loadMore = () => {
    setVisibleCount((current) =>
      Math.min(current + PAGE_SIZE, filteredOpportunities.length)
    );
  };

  return {
    search,
    setSearch,
    category,
    setCategory,
    categories,
    filteredOpportunities,
    visibleOpportunities,
    hasMore: visibleCount < filteredOpportunities.length,
    loadMore,
  };
}
