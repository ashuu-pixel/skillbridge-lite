
import React, { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useParams
} from "react-router-dom";

import "./App.css";
import OpportunityExplorer from "./components/OpportunityExplorer";

const Apply = lazy(() => import("./pages/Apply"));

const internships = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    company: "PixelCraft Studio",
    location: "Remote",
    description: "Learn to build responsive websites using HTML, CSS, JavaScript, and React."
  },
  {
    id: "2",
    title: "UI/UX Design Intern",
    company: "CreativeNest",
    location: "Islamabad, Pakistan",
    description: "Help design user-friendly interfaces, wireframes, and prototypes."
  },
  {
    id: "3",
    title: "React Developer Intern",
    company: "TechNova",
    location: "Remote",
    description: "Practice React components, hooks, routing, and reusable UI development."
  },
  {
    id: "4",
    title: "Web Development Intern",
    company: "CodeSpring",
    location: "Lahore, Pakistan",
    description: "Work on real-world web layouts and learn modern development workflows."
  },
  {
    id: "5",
    title: "Digital Marketing Intern",
    company: "BrightPath Media",
    location: "Remote",
    description: "Explore social media campaigns, content planning, and digital analytics."
  },
  {
    id: "6",
    title: "Python Developer Intern",
    company: "DataBridge Labs",
    location: "Karachi, Pakistan",
    description: "Build programming fundamentals and explore Python-based applications."
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

        <Route
          path="/apply/:id"
          element={
            <Suspense fallback={<main className="page"><h1>Loading application form...</h1></main>}>
              <Apply />
            </Suspense>
          }
        />

        <Route path="/explorer" element={<OpportunityExplorer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
