import Link from "next/link";

function Highlights() {
  return (
    <section className="highlights">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Why Choose Us?</h2>
          <p className="section-subtitle">
            More than just Fantasy Cricket - Build Your Cricket Empire
          </p>
        </div>

        <div className="highlights-grid">
          <div className="highlight-card highlight-primary">
            <div className="card-glow"></div>
            <div className="highlight-icon-wrapper">
              <div className="highlight-icon">💰</div>
            </div>
            <h3>Earn Passive Income</h3>
            <p>
              Get <strong>₹5,000</strong> instant bonus + <strong>₹500</strong>{" "}
              for every friend who joins
            </p>
            <div className="card-badge">MLM System</div>
          </div>

          <div className="highlight-card highlight-secondary">
            <div className="card-glow"></div>
            <div className="highlight-icon-wrapper">
              <div className="highlight-icon">📈</div>
            </div>
            <h3>Lifetime Commission</h3>
            <p>
              Earn <strong>1% commission</strong> on every deposit your
              referrals make - forever!
            </p>
            <div className="card-badge">Recurring Revenue</div>
          </div>

          <div className="highlight-card">
            <div className="highlight-icon-wrapper">
              <div className="highlight-icon">🎯</div>
            </div>
            <h3>Mega Contests Daily</h3>
            <p>
              Join contests from ₹10 to ₹10,000 entry fee. Win up to{" "}
              <strong>₹10 Lakhs</strong>
            </p>
          </div>

          <div className="highlight-card">
            <div className="highlight-icon-wrapper">
              <div className="highlight-icon">🎫</div>
            </div>
            <h3>Coupon-Based System</h3>
            <p>Instant wallet credit with coupons. No payment gateway delays</p>
          </div>

          <div className="highlight-card">
            <div className="highlight-icon-wrapper">
              <div className="highlight-icon">🏏</div>
            </div>
            <h3>Multiple Contest Types</h3>
            <p>
              Mega Leagues, Head-to-Head, Small Groups, Winner Takes All,
              Practice
            </p>
          </div>

          <div className="highlight-card">
            <div className="highlight-icon-wrapper">
              <div className="highlight-icon">⚡</div>
            </div>
            <h3>Instant Withdrawal</h3>
            <p>Withdraw your winnings directly to bank account via support</p>
          </div>
        </div>

        <div className="referral-banner">
          <div className="referral-content">
            <div className="referral-icon">🎁</div>
            <div className="referral-text">
              <h3>Invite Friends & Earn Together</h3>
              <p>
                Share your invitation code and build your downline network. The
                more they play, the more you earn!
              </p>
            </div>
            <Link href="/dashboard" className="btn btn-referral">
              Get Your Invite Code →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Highlights;
