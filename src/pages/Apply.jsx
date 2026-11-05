
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const API_URL = "/opportunities.json";

export default function Apply() {
  const { id } = useParams();

  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const controller = new AbortController();

    async function loadInternship() {
      try {
        setLoading(true);
        setLoadError("");

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

        setInternship(found);

      } catch {
        if (error.name !== "AbortError") {
          setLoadError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadInternship();

    return () => controller.abort();
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData(previous => ({
      ...previous,
      [name]: value
    }));

    setErrors(previous => ({
      ...previous,
      [name]: ""
    }));

    setSubmitError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^[+]?[0-9\s-]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please tell us about yourself.";
    }

    setErrors(newErrors);
    setSubmitted(false);
    setSubmitError("");

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setSubmitting(true);

    try {
      const existing = JSON.parse(
        localStorage.getItem("skillbridge-applications") || "[]"
      );

      if (!Array.isArray(existing)) {
        throw new Error("Invalid saved application data.");
      }

      const application = {
        id: String(Date.now()),
        opportunityId: internship.id,
        opportunityTitle: internship.title,
        title: internship.title,
        company: internship.company,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
        date: new Date().toISOString(),
        status: "Submitted"
      };

      localStorage.setItem(
        "skillbridge-applications",
        JSON.stringify([...existing, application])
      );

      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

    } catch (error) {
      setSubmitError(
        "Unable to save your application. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className="page">
        <h1>Loading opportunity...</h1>
        <p>Please wait a moment.</p>
      </main>
    );
  }

  if (loadError || !internship) {
    return (
      <main className="page">
        <h1>Opportunity Not Found</h1>
        <p role="alert">
          {loadError || "This opportunity does not exist."}
        </p>

        <NavLink to="/opportunities" className="primary-link">
          Browse Opportunities
        </NavLink>
      </main>
    );
  }

  return (
    <main className="page">
      <p className="eyebrow">TAKE YOUR NEXT STEP</p>

      <h1>Apply for an Opportunity</h1>

      <p className="intro-text">
        Applying for <strong>{internship.title}</strong> at{" "}
        {internship.company}.
      </p>

      <form className="apply-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p className="error-message" id="name-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p className="error-message" id="email-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+92 300 1234567"
            value={formData.phone}
            onChange={handleChange}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p className="error-message" id="phone-error" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="message">Why are you interested?</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Tell us about your interests and skills..."
            value={formData.message}
            onChange={handleChange}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p className="error-message" id="message-error" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        {submitError && (
          <p className="error-message" role="alert">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          className="primary-link form-button"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Application →"}
        </button>

        {submitted && (
          <div className="success-message" role="status" aria-live="polite">
            <strong>Application submitted successfully!</strong>
            <p>
              Your application has been saved in this browser.
              It has not been sent to a real organization.
            </p>
            <NavLink to="/my-applications">
              View My Applications →
            </NavLink>
          </div>
        )}
      </form>

      <p>
        <small>
          Demo notice: This is a frontend simulation. No real backend or
          organization submission is connected.
        </small>
      </p>
    </main>
  );
}
