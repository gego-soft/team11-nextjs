import Link from "next/link";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-shape hero-shape-1"></div>
        <div className="hero-shape hero-shape-2"></div>
        <div className="hero-shape hero-shape-3"></div>
      </div>

      <div className="hero-container">
        <div className="hero-badge">
          <span className="badge-icon">🔥</span>
          <span>100+ Contests Live Now</span>
        </div>

        <h1 className="hero-title">
          Win <span className="highlight-text">₹10 Lakhs</span> Every Match
          <br />
          <span className="gradient-text">Fantasy Cricket at Its Best</span>
        </h1>

        <p className="hero-lead">
          Join thousands of cricket fans. Build dream teams, compete in mega
          contests, and earn from <strong>Referrals & Commissions</strong>
        </p>

        <div className="hero-cta-group">
          <Link href="/dashboard" className="btn btn-cta btn-primary">
            <span>Join Contest Now</span>
            <span className="btn-icon">→</span>
          </Link>
          <Link href="/contests" className="btn btn-cta btn-secondary">
            <span>Browse Contests</span>
          </Link>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">₹5,000</div>
            <div className="hero-stat-label">Welcome Bonus</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">₹500</div>
            <div className="hero-stat-label">Per Referral</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">1%</div>
            <div className="hero-stat-label">Lifetime Commission</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
