function Winners() {
  const topWinners = [
    {
      name: "Rajesh K.",
      amount: "₹2,50,000",
      type: "Contest Winner",
      badge: "🏆",
      gradient: "gold",
    },
    {
      name: "Priya S.",
      amount: "₹1,85,000",
      type: "Referral Earnings",
      badge: "💎",
      gradient: "purple",
    },
    {
      name: "Amit P.",
      amount: "₹95,000",
      type: "Contest Winner",
      badge: "🎯",
      gradient: "blue",
    },
    {
      name: "Sneha M.",
      amount: "₹67,500",
      type: "Commission Income",
      badge: "💰",
      gradient: "green",
    },
  ];

  const recentWinners = [
    {
      name: "Vikram D.",
      amount: "₹42,000",
      type: "Referral Earnings",
      badge: "🔥",
      gradient: "orange",
    },
    {
      name: "Kavya R.",
      amount: "₹38,900",
      type: "Contest Winner",
      badge: "⚡",
      gradient: "cyan",
    },
    {
      name: "Arjun M.",
      amount: "₹35,600",
      type: "Commission Income",
      badge: "💵",
      gradient: "green",
    },
    {
      name: "Meera P.",
      amount: "₹31,200",
      type: "Contest Winner",
      badge: "🎊",
      gradient: "blue",
    },
    {
      name: "Rohan S.",
      amount: "₹28,500",
      type: "Referral Earnings",
      badge: "🌟",
      gradient: "purple",
    },
    {
      name: "Diya K.",
      amount: "₹25,800",
      type: "Commission Income",
      badge: "💸",
      gradient: "gold",
    },
  ];

  return (
    <section className="winners">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">💸 Recent Earnings</h2>
          <p className="section-subtitle">
            Real people winning real money - contests & referrals
          </p>
        </div>

        <div className="winners-top-grid">
          {topWinners.map((winner, index) => (
            <div
              key={index}
              className={`winner-card winner-card-large winner-${winner.gradient}`}
            >
              <div className="winner-rank">{index + 1}</div>
              <div className="winner-badge-large">{winner.badge}</div>
              <h3 className="winner-name">{winner.name}</h3>
              <div className="winner-amount">{winner.amount}</div>
              <div className="winner-type">{winner.type}</div>
              <div className="winner-shine"></div>
            </div>
          ))}
        </div>

        <div className="winners-recent-grid">
          {recentWinners.map((winner, index) => (
            <div
              key={index}
              className={`winner-card winner-card-small winner-${winner.gradient}`}
            >
              <div className="winner-rank">{index + 5}</div>
              <div className="winner-badge-small">{winner.badge}</div>
              <h3 className="winner-name-small">{winner.name}</h3>
              <div className="winner-amount-small">{winner.amount}</div>
              <div className="winner-type-small">{winner.type}</div>
              <div className="winner-shine"></div>
            </div>
          ))}
        </div>

        <div className="winners-ticker">
          <div className="ticker-content">
            <span>🎊 Arjun won ₹45,000</span>
            <span>🔥 Kavya earned ₹32,100 from referrals</span>
            <span>⚡ Sanjay won ₹78,900</span>
            <span>💵 Meera's commission: ₹21,450</span>
            <span>🏆 Vikas won ₹1,20,000</span>
            <span>💎 Pooja's downline earned her ₹54,600</span>
            {/* Duplicate for seamless loop */}
            <span>🎊 Arjun won ₹45,000</span>
            <span>🔥 Kavya earned ₹32,100 from referrals</span>
            <span>⚡ Sanjay won ₹78,900</span>
            <span>💵 Meera's commission: ₹21,450</span>
            <span>🏆 Vikas won ₹1,20,000</span>
            <span>💎 Pooja's downline earned her ₹54,600</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Winners;
