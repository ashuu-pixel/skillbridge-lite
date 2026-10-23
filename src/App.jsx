
import React from "react";
import { BrowserRouter, Routes, Route, NavLink, useParams } from "react-router-dom";
import "./App.css";
import OpportunityExplorer from "./components/OpportunityExplorer";

const internships = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: "PixelCraft Studio",
    location: "Remote",
    description:
      "Learn to build responsive websites using HTML, CSS, JavaScript, and React."
  },
  {
    id: "2",
    title: "UI/UX Design Intern",
    company: "CreativeNest",
    location: "Islamabad, Pakistan",
    description:
      "Help design user-friendly interfaces, wireframes, and prototypes."
  },
  {
    id: "3",
    title: "React Developer Intern",
    company: "TechNova",
    location: "Remote",
    description:
      "Practice React components, hooks, routing, and reusable UI development."
  },
  {
    id: "4",
    title: "Web Development Intern",
    company: "CodeSpring",
    location: "Lahore, Pakistan",
    description:
      "Work on real-world web layouts and learn modern development workflows."
  },
  {
    id: "5",
    title: "Digital Marketing Intern",
    company: "BrightPath Media",
    location: "Remote",
    description:
      "Explore social media campaigns, content planning, and digital analytics."
  },
  {
    id: "6",
    title: "Python Developer Intern",
    company: "DataBridge Labs",
    location: "Karachi, Pakistan",
    description:
      "Build programming fundamentals and explore Python-based applications."
  }
];

function Home() {
  return (
    <main className="page hero">
      <p className="eyebrow">YOUR SKILLS + OUR BRIDGE = YOUR FUTURE</p>

      <h1>
        Find Your Dream Internship with{" "}
        <span className="hero-highlight">SkillBridge Lite.</span>
      </h1>

      <p>
        Discover exciting internship opportunities, build real-world skills,
        and take your first step toward a career you love.
      </p>

      <NavLink to="/listings" className="primary-link">
        Explore Internships <span aria-hidden="true">→</span>
      </NavLink>

      <div className="hero-art" aria-label="Learning and career illustration">
        <div className="art-orbit"></div>
        <div className="art-sparkle sparkle-one">✦</div>
        <div className="art-sparkle sparkle-two">✧</div>

        <div className="art-main-icon" aria-hidden="true">
          <span className="art-cap">🎓</span>
          <span className="art-laptop">💻</span>
        </div>

        <div className="art-bubble bubble-learn">
          <span>💡</span>
          <div>
            <strong>Learn</strong>
            <small>New skills</small>
          </div>
        </div>

        <div className="art-bubble bubble-grow">
          <span>🌱</span>
          <div>
            <strong>Grow</strong>
            <small>Your future</small>
          </div>
        </div>

        <div className="art-caption">
          <span>✨</span> Small steps. Big dreams.
        </div>
      </div>
    </main>
  );
}


function Listings() {
  return (
    <main className="page">
      <p className="eyebrow">EXPLORE OPPORTUNITIES</p>
      <h1>Internship Listings</h1>
      <p className="intro-text">
        Find an opportunity that matches your interests.
      </p>

      <section className="listing-grid" aria-label="Available internships">
        {internships.map((internship) => (
          <article className="internship-card" key={internship.id}>
            <span className="card-label">INTERNSHIP</span>
            <h2>{internship.title}</h2>
            <p className="company">{internship.company}</p>
            <p className="location">📍 {internship.location}</p>
            <p>{internship.description}</p>
            <NavLink
              to={`/listings/${internship.id}`}
              className="card-link"
            >
              View Details →
            </NavLink>
          </article>
        ))}
      </section>
    </main>
  );
}

function ListingDetails() {
  const { id } = useParams();
  const internship = internships.find((item) => item.id === id);

  if (!internship) {
    return (
      <main className="page">
        <h1>Internship Not Found</h1>
        <p>Sorry, this internship does not exist.</p>
        <NavLink to="/listings" className="primary-link">
          Back to Listings
        </NavLink>
      </main>
    );
  }

  return (
    <main className="page details-card">
      <p className="eyebrow">INTERNSHIP DETAILS</p>
      <h1>{internship.title}</h1>
      <h2>{internship.company}</h2>
      <p>📍 {internship.location}</p>
      <p>{internship.description}</p>
      <NavLink to={`/apply/${internship.id}`} className="primary-link">
        Apply for This Internship →
      </NavLink>
      <p>
        <NavLink to="/listings" className="text-link">
          ← Back to all internships
        </NavLink>
      </p>
    </main>
  );
}


function Apply() {
  const { id } = useParams();
  

  const [internship, setInternship] = React.useState(null);
  const [internshipLoading, setInternshipLoading] = React.useState(true);

  React.useEffect(() => {
    const controller = new AbortController();

    async function loadInternship() {
      try {
        const response = await fetch(
          `http://localhost:3001/opportunities/${id}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Internship not found");
        }

        const data = await response.json();
        setInternship(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          const fallback = internships.find(
            (item) => String(item.id) === String(id)
          );
          setInternship(fallback || null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setInternshipLoading(false);
        }
      }
    }

    loadInternship();

    return () => controller.abort();
  }, [id]);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    setErrors((previous) => ({
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
    if (internshipLoading) {
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
  if (internshipLoading) {
  return (
    <main className="page">
      <h1>Loading internship...</h1>
      <p>Please wait while we load the application form.</p>
    </main>
  );
}

if (!internship) {
  return (
    <main className="page">
      <h1>Internship Not Found</h1>
      <p>This internship could not be found.</p>
      <NavLink to="/explorer">Back to Explorer</NavLink>
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


function NotFound() {
  return (
    <main className="page">
      <h1>404 — Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <NavLink to="/" className="primary-link">
        Back to Home
      </NavLink>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <NavLink to="/" className="brand">
          SkillBridge<span> Lite</span>
        </NavLink>

        <nav aria-label="Main navigation">
  <NavLink to="/" end>Home</NavLink>
  <NavLink to="/listings">Listings</NavLink>
  <NavLink to="/explorer">Explorer</NavLink>
  <NavLink to="/apply/1">Apply</NavLink>
</nav>
      </header>

     <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/listings" element={<Listings />} />
  <Route path="/listings/:id" element={<ListingDetails />} />
  <Route path="/apply/:id" element={<Apply />} />
  <Route path="/explorer" element={<OpportunityExplorer />} />
  <Route path="*" element={<NotFound />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;
