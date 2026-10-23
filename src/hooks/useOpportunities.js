
import { useEffect, useState } from "react";

const API_URL = "/opportunities.json";

export default function useOpportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchOpportunities() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            "Unable to load opportunities. Please try again."
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("The API returned an invalid response.");
        }

        setOpportunities(data);
      } catch (err) {
        if (err.name === "AbortError") return;

        setError(
          err.message ||
            "Something went wrong. Please check your connection."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchOpportunities();

    return () => controller.abort();
  }, []);

  return {
    opportunities,
    loading,
    error,
  };
}
