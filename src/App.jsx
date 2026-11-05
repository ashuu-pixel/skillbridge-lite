
import React, { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from "react-router-dom";

import "./App.css";
import OpportunityExplorer from "./components/OpportunityExplorer";

const Apply = lazy(() => import("./pages/Apply"));
const MyApplications = lazy(() => import("./pages/MyApplications"));
const OpportunityDetail = lazy(() => import("./pages/OpportunityDetail"));

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

      <NavLink to="/opportunities" className="primary-link">
        Explore Opportunities →
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
          <NavLink to="/opportunities">Explore</NavLink>
          <NavLink to="/my-applications">My Applications</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/opportunities"
          element={<OpportunityExplorer />}
        />

        <Route
          path="/opportunities/:id"
          element={
            <Suspense fallback={<main className="page">Loading details...</main>}>
              <OpportunityDetail />
            </Suspense>
          }
        />

        <Route
          path="/opportunities/:id/apply"
          element={
            <Suspense fallback={<main className="page">Loading form...</main>}>
              <Apply />
            </Suspense>
          }
        />

        <Route
          path="/my-applications"
          element={
            <Suspense fallback={<main className="page">Loading applications...</main>}>
              <MyApplications />
            </Suspense>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
