
import { useState } from "react";
import { NavLink } from "react-router-dom";

function getSavedApplications() {
  try {
    const savedApplications = localStorage.getItem(
      "skillbridge-applications"
    );

    if (!savedApplications) return [];

    const parsed = JSON.parse(savedApplications);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function MyApplications() {
  const [applications] = useState(getSavedApplications);

  return (
    <main className="page">
      <p className="eyebrow">YOUR CAREER JOURNEY</p>

      <h1>My Applications</h1>

      <p className="intro-text">
        Track the opportunities you have applied for.
      </p>

      {applications.length === 0 ? (
        <section className="details-card">
          <h2>No Applications Yet!</h2>
          <p>
            You haven't submitted any applications yet.
            Start exploring opportunities today.
          </p>

          <NavLink to="/opportunities" className="primary-link">
            Explore Opportunities →
          </NavLink>
        </section>
      ) : (
        <section className="listing-grid" aria-label="Your applications">
          {applications.map((application, index) => (
            <article
              className="internship-card"
              key={application.id || index}
            >
              <span className="card-label">
                APPLICATION SUBMITTED
              </span>

              <h2>
                {application.opportunityTitle ||
                  application.title ||
                  "Internship"}
              </h2>

              <p className="company">
                {application.company || "Organization"}
              </p>

              <p>
                <strong>Applicant:</strong> {application.name}
              </p>

              <p>
                <strong>Email:</strong> {application.email}
              </p>

              <p>
                <strong>Status:</strong> Submitted
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {application.date
                  ? new Date(application.date).toLocaleDateString()
                  : "Not available"}
              </p>
            </article>
          ))}
        </section>
      )}

      <p>
        <small>
          Note: Applications are stored locally in this browser.
          This is a frontend simulation, not a real application backend.
        </small>
      </p>
    </main>
  );
}

export default MyApplications;
