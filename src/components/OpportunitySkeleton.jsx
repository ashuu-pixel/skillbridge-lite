
export default function OpportunitySkeleton() {
  return (
    <main className="explorer-page">
      <section className="explorer-container">
        <div className="explorer-heading">
          <span className="explorer-eyebrow">
            YOUR NEXT CHAPTER STARTS HERE
          </span>

          <h1>
            Discover your next opportunity<span>.</span>
          </h1>

          <p>Finding opportunities made simple.</p>
        </div>

        <p role="status" aria-live="polite">
          Loading opportunities...
        </p>

        <div className="opportunity-grid">
          {Array.from({ length: 6 }, (_, index) => (
            <div className="opportunity-skeleton" key={index}>
              <div className="skeleton-line skeleton-icon" />
              <div className="skeleton-line skeleton-title" />
              <div className="skeleton-line skeleton-company" />
              <div className="skeleton-line skeleton-description" />
              <div className="skeleton-line skeleton-button" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
