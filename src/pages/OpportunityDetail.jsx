
import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";

const API_URL = "/opportunities.json";

function OpportunityDetail() {
  const { id } = useParams();

  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchOpportunity() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error("Unable to load opportunities.");
        }

        const data = await response.json();

        const list = Array.isArray(data)
          ? data
          : data.opportunities;

        if (!Array.isArray(list)) {
          throw new Error("Invalid opportunity data.");
        }

        const found = list.find(
          item => String(item.id) === String(id)
        );

        if (!found) {
          throw new Error("Opportunity not found.");
        }

        setOpportunity(found);

      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchOpportunity();

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <main className="page">
        <h1>Loading opportunity...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <h1>Unable to load opportunity</h1>
        <p role="alert">{error}</p>

        <NavLink to="/opportunities" className="primary-link">
          Back to Opportunities
        </NavLink>
      </main>
    );
  }

  return (
    <main className="page details-card">
      <p className="eyebrow">OPPORTUNITY DETAILS</p>

      <h1>{opportunity.title}</h1>
      <h2>{opportunity.company}</h2>

      <p>📍 {opportunity.location}</p>
      <p>{opportunity.description}</p>

      <p><strong>Category:</strong> {opportunity.category}</p>
      <p><strong>Type:</strong> {opportunity.type}</p>
      <p><strong>Stipend:</strong> {opportunity.stipend}</p>

      <NavLink
        to={`/opportunities/${opportunity.id}/apply`}
        className="primary-link"
      >
        Apply Now →
      </NavLink>

      <p>
        <NavLink to="/opportunities" className="text-link">
          ← Back to Opportunities
        </NavLink>
      </p>
    </main>
  );
}

export default OpportunityDetail;
