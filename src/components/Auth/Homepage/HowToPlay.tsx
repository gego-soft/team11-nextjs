import Link from "next/link";

function HowToPlay() {
  return (
    <section className="how-to-play">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Get Started in 3 Minutes</h2>
          <p className="section-subtitle">
            Win from contests AND build passive income
          </p>
        </div>

        <div className="steps-container">
          <div className="step-card step-1">
            <div className="step-header">
              <div className="step-number">1</div>
              <div className="step-icon">🎯</div>
            </div>
            <h3>Join & Get ₹5,000</h3>
            <p>
              Sign up with invitation code and receive instant{" "}
              <strong>₹5,000 bonus</strong> in your wallet
            </p>
            <div className="step-highlight">Instant Credit</div>
          </div>
          <div className="hidden md:block step-arrow">→</div>
          <div className="block md:hidden step-arrow">↓</div>
          <div className="step-card step-2">
            <div className="step-header">
              <div className="step-number">2</div>
              <div className="step-icon">🏏</div>
            </div>
            <h3>Create Teams & Join Contests</h3>
            <p>
              Pick your dream team from upcoming matches and enter contests
              starting at just ₹10
            </p>
            <div className="step-highlight">Multiple Contests</div>
          </div>
          <div className="hidden md:block step-arrow">→</div>
          <div className="block md:hidden step-arrow">↓</div>
          <div className="step-card step-3">
            <div className="step-header">
              <div className="step-number">3</div>
              <div className="step-icon">💰</div>
            </div>
            <h3>Win & Earn Commission</h3>
            <p>
              Win from contests AND earn{" "}
              <strong>₹500 per referral + 1% commission</strong> on their
              deposits forever
            </p>
            <div className="step-highlight">Dual Income</div>
          </div>
        </div>

        <div className="income-breakdown">
          <h3 className="breakdown-title">💡 Two Ways to Earn Money</h3>
          <div className="breakdown-grid">
            <div className="breakdown-item">
              <div className="breakdown-icon">🏆</div>
              <h4>Contest Winnings</h4>
              <ul>
                <li>Join contests from ₹10 to ₹10,000</li>
                <li>Win up to ₹10 Lakhs per contest</li>
                <li>Multiple contest types available</li>
                <li>Play daily matches</li>
              </ul>
            </div>
            <div className="breakdown-divider">+</div>
            <div className="breakdown-item">
              <div className="breakdown-icon">📈</div>
              <h4>Referral Income</h4>
              <ul>
                <li>₹5,000 bonus for each friend who joins</li>
                <li>₹500 instant when they sign up</li>
                <li>1% commission on all their deposits</li>
                <li>Lifetime passive income</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <div className="cta-content">
            <h3>Ready to Start Earning?</h3>
            <p>Join thousands of cricket fans who are already winning</p>
            <div className="cta-buttons">
              <Link
                href="/dashboard"
                className="btn btn-large btn-outline px-4"
              >
                Get Started Now - ₹5,000 Bonus
              </Link>
              <Link href="/contests" className="btn btn-large btn-outline">
                View Live Contests
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowToPlay;
