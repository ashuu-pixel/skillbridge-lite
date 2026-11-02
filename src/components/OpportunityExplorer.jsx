
import { useNavigate } from "react-router-dom";

import useOpportunities from "../hooks/useOpportunities";
import useOpportunityFilters from "../hooks/useOpportunityFilters";

import OpportunitySkeleton from "./OpportunitySkeleton";
import OpportunityError from "./OpportunityError";

import "./OpportunityExplorer.css";

export default function OpportunityExplorer() {
  const navigate = useNavigate();

  const {
    opportunities,
    loading,
    error,
  } = useOpportunities();

  const {
    search,
    setSearch,
    category,
    setCategory,
    categories,
    filteredOpportunities,
    visibleOpportunities,
    hasMore,
    loadMore,
  } = useOpportunityFilters(opportunities);

  if (loading) {
    return <OpportunitySkeleton />;
  }

  if (error) {
    return <OpportunityError error={error} />;
  }

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
  };

  return (
    <main className="explorer-page">
      <section className="explorer-container">

        <header className="explorer-heading">
          <span className="explorer-eyebrow">
            ✦ YOUR FUTURE, YOUR WAY
          </span>

          <h1>
            Find your next
            <br />
            <span>big opportunity.</span>
          </h1>

          <p>
            Explore internships and entry-level roles.
            Your next chapter could start today.
          </p>
        </header>

        <section className="explorer-toolbar">
          <label className="explorer-search">
            <span aria-hidden="true">⌕</span>

            <input
              type="search"
              placeholder="Search roles, companies, skills..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search opportunities"
            />

            {search && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </label>

          <label className="category-select">
            <span>Category</span>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All categories" : item}
                </option>
              ))}
            </select>
          </label>
        </section>

        <div
          className="results-heading"
          aria-live="polite"
          aria-atomic="true"
        >
          <div>
            <h2>
              Explore opportunities <span>✦</span>
            </h2>

            <p>
              {filteredOpportunities.length}{" "}
              {filteredOpportunities.length === 1
                ? "opportunity"
                : "opportunities"}{" "}
              found
            </p>
          </div>

          <span className="results-badge">
            Made for your future
          </span>
        </div>

        {filteredOpportunities.length === 0 ? (
          <section className="explorer-message empty-message">
            <span className="message-icon">🔎</span>

            <h2>No opportunities found</h2>

            <p>
              We couldn't find a match for your search.
              Try another keyword or choose a different category.
            </p>

            <button
              className="explorer-button"
              onClick={clearFilters}
            >
              Clear all filters
            </button>
          </section>
        ) : (
          <>
            <div className="opportunity-grid">
              {visibleOpportunities.map((item) => (
                <article
                  className="opportunity-card"
                  key={item.id}
                >
                  <div className="card-top">
                    <div
                      className="company-icon"
                      style={{
                        backgroundColor: item.color || "#eee8ff",
                      }}
                    >
                      {item.icon || "💼"}
                    </div>

                    <span className="category-badge">
                      {item.category}
                    </span>
                  </div>

                  <h3>{item.title}</h3>

                  <p className="company-name">
                    {item.company}
                  </p>

                  <p className="opportunity-description">
                    {item.description}
                  </p>

                  <div className="opportunity-details">
                    <span>📍 {item.location}</span>
                    <span>💼 {item.type}</span>
                  </div>

                  <div className="card-bottom">
                    <div className="stipend">
                      <span>Monthly stipend</span>
                      <strong>{item.stipend}</strong>
                    </div>

                    <button
                      type="button"
                      className="apply-button"
                      onClick={() => navigate(`/apply/${item.id}`)}
                    >
                      Apply <span>↗</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {hasMore && (
              <div className="load-more-container">
                <button
                  className="load-more-button"
                  onClick={loadMore}
                >
                  Load more opportunities <span>↓</span>
                </button>
              </div>
            )}
          </>
        )}

        <footer className="explorer-footer">
          <span>✦ SkillBridge Explorer</span>
          <span>Small steps. Big futures.</span>
        </footer>

      </section>
    </main>
  );
}
