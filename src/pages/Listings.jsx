
import { Link } from "react-router-dom";
import listings from "../data/listings";

function Listings() {
  return (
    <main className="page listings-page">
      <div className="section-heading">
        <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
        <h1>Explore Internship Opportunities</h1>
        <p>
          Discover opportunities, build your skills, and take
          the next step toward your dream career.
        </p>
      </div>

      <div className="listings-grid">
        {listings.map((listing) => (
          <article className="listing-card" key={listing.id}>
            <span className="listing-type">{listing.type}</span>

            <h2>{listing.title}</h2>

            <p className="company-name">{listing.company}</p>

            <p className="location">
              <span aria-hidden="true">📍</span>{" "}
              {listing.location}
            </p>

            <p className="listing-description">
              {listing.description}
            </p>

            <div className="skills">
              {listing.skills.slice(0, 3).map((skill) => (
                <span className="skill-tag" key={skill}>
                  {skill}
                </span>
              ))}
            </div>

            <Link
              className="details-link"
              to={`/listings/${listing.id}`}
            >
              View Details <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Listings;
