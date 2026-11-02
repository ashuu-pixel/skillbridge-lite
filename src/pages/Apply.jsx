
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const internships = [
  { id: "1", title: "Frontend Developer Intern", company: "PixelCraft Studio", location: "Remote", description: "Learn to build responsive websites using HTML, CSS, JavaScript, and React." },
  { id: "2", title: "UI/UX Design Intern", company: "CreativeNest", location: "Islamabad, Pakistan", description: "Help design user-friendly interfaces, wireframes, and prototypes." },
  { id: "3", title: "React Developer Intern", company: "TechNova", location: "Remote", description: "Practice React components, hooks, routing, and reusable UI development." },
  { id: "4", title: "Web Development Intern", company: "CodeSpring", location: "Lahore, Pakistan", description: "Work on real-world web layouts and learn modern development workflows." },
  { id: "5", title: "Digital Marketing Intern", company: "BrightPath Media", location: "Remote", description: "Explore social media campaigns, content planning, and digital analytics." },
  { id: "6", title: "Python Developer Intern", company: "DataBridge Labs", location: "Karachi, Pakistan", description: "Build programming fundamentals and explore Python-based applications." }
];

export default function Apply() {
  const { id } = useParams();

  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadInternship() {
      try {
        const response = await fetch("/opportunities.json", {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error("Unable to load internships");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid internship data");
        }

        const found = data.find(
          item => String(item.id) === String(id)
        );

        setInternship(found || null);
      } catch (error) {
        if (error.name === "AbortError") return;

        const fallback = internships.find(
          item => String(item.id) === String(id)
        );

        setInternship(fallback || null);
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

    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please tell us a little about yourself.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  }

  if (loading) {
    return (
      <main className="page">
        <h1>Loading internship...</h1>
        <p>Please wait a moment.</p>
      </main>
    );
  }

  if (!internship) {
    return (
      <main className="page">
        <h1>Internship Not Found</h1>
        <p>Please select an internship before applying.</p>
        <NavLink to="/listings" className="primary-link">
          Browse Internships
        </NavLink>
      </main>
    );
  }

  return (
    <main className="page">
      <p className="eyebrow">TAKE YOUR NEXT STEP</p>
      <h1>Apply for an Internship</h1>

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

        <button type="submit" className="primary-link form-button">
          Submit Application →
        </button>

        {submitted && (
          <div className="success-message" role="status" aria-live="polite">
            <strong>Application completed successfully!</strong>
            <p>
              This is a demo confirmation. Your application has not been
              sent to a server.
            </p>
          </div>
        )}
      </form>
    </main>
  );
}
