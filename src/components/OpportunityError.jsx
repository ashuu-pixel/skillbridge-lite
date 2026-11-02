
export default function OpportunityError({ error }) {
  return (
    <main className="explorer-page">
      <section className="explorer-message error-message">
        <span className="message-icon">⚠️</span>

        <h2>Oops! Something went wrong.</h2>

        <p>{error}</p>

        <p>
          Make sure your mock API is running on port 3001,
          then try again.
        </p>

        <button
          className="explorer-button"
          onClick={() => window.location.reload()}
        >
          Try again ↻
        </button>
      </section>
    </main>
  );
}
