import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>
            Empowering Women Through
            Opportunities and Resources
          </h1>

          <p>
            Discover scholarships,
            internships, programs and
            learning resources to help
            you learn, grow and achieve
            your goals.
          </p>

          <div className="hero-buttons">
            <Link to="/opportunities" className="btn-primary">
              Explore Opportunities
            </Link>

            <Link to="/resources" className="btn-secondary">
              Browse Resources
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img src="/logo.png" alt="Femella Logo" className="hero-logo" />
          <h2>Femella Empower</h2>
        </div>
      </section>

      {/* Statistics */}
      <section className="stats">
        <div className="stat-card"><h2>500+</h2><p>Opportunities</p></div>
        <div className="stat-card"><h2>300+</h2><p>Resources</p></div>
        <div className="stat-card"><h2>1000+</h2><p>Women Empowered</p></div>
      </section>

      {/* Services */}
      <section className="services">
        <h2>What We Offer</h2>

        <div className="service-grid">
          <div className="service-card">
            <h3>🎓 Scholarships</h3>
            <p>Discover educational funding opportunities.</p>
          </div>

          <div className="service-card">
            <h3>💼 Internships</h3>
            <p>Find internships and industry experiences.</p>
          </div>

          <div className="service-card">
            <h3>🤝 Resources</h3>
            <p>Safety and Support Hub</p>
          </div>

          <div className="service-card">
            <h3>❤️ Save Opportunities</h3>
            <p>Bookmark opportunities and revisit them anytime.</p>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="journey">
        <h2>Your Journey with Femella</h2>
        <div className="journey-flow">
          Discover → Save → Apply → Grow
        </div>
      </section>

    </div>
  );
}

export default Home;