"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AddCash from "../MyWallet/AddCash";

function Dashboard({ walletBalance = 1000, hasInvitationBonus = false }) {
  const navigate = useRouter();
  const [invitationCode, setInvitationCode] = useState("IPL2025XYZ");
  const [copied, setCopied] = useState(false);
  const [showAddCash, setShowAddCash] = useState(false);

  const generateInvitationCode = () => {
    const code =
      "IPL" + Math.random().toString(36).substring(2, 9).toUpperCase();
    setInvitationCode(code);
  };

  const copyInvitationCode = () => {
    navigator.clipboard.writeText(invitationCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="dashboard">
        <div className="dashboard-container">
          {/*  <Sidebar /> */}

          <main className="dashboard-main">
            <div className="dashboard-header">
              <h1>Dashboard</h1>
              <div className="user-balance">
                <div className="balance-info">
                  <span className="balance-label">Wallet Balance:</span>
                  <span className="balance-amount">
                    ₹{walletBalance.toLocaleString()}
                  </span>
                  {hasInvitationBonus && (
                    <span className="bonus-badge">🎉 +₹5,000 Bonus</span>
                  )}
                </div>
                <button
                  className="btn btn-add-cash"
                  onClick={() => setShowAddCash(true)}
                >
                  Add Cash
                </button>
              </div>
            </div>

            <div className="dashboard-content">
              <div className="invitation-section">
                <div className="invitation-card">
                  <div className="invitation-header">
                    <h3>🎁 Invite Friends & Earn</h3>
                    <p>Share your code and get ₹5,000 when friends join!</p>
                  </div>
                  <div className="invitation-code-container">
                    <div className="code-display">
                      <span className="code-label">Your Invitation Code</span>
                      <span className="code-value">{invitationCode}</span>
                    </div>
                    <div className="code-actions">
                      <button
                        className="btn btn-copy"
                        onClick={copyInvitationCode}
                      >
                        {copied ? "✓ Copied!" : "📋 Copy Code"}
                      </button>
                      <button
                        className="btn btn-generate"
                        onClick={generateInvitationCode}
                      >
                        🔄 Generate New
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">🏆</div>
                  <div className="stat-info">
                    <h3>Total Wins</h3>
                    <p className="stat-value">₹5,420</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-info">
                    <h3>Teams Created</h3>
                    <p className="stat-value">12</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🎯</div>
                  <div className="stat-info">
                    <h3>Contests Joined</h3>
                    <p className="stat-value">28</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📈</div>
                  <div className="stat-info">
                    <h3>Win Rate</h3>
                    <p className="stat-value">65%</p>
                  </div>
                </div>
              </div>

              <div className="upcoming-matches">
                <h2>Upcoming Matches</h2>
                <div className="matches-list">
                  <div className="match-card">
                    <div className="match-teams">
                      <div className="team">
                        <span className="team-logo">MI</span>
                        <span className="team-name">Mumbai Indians</span>
                      </div>
                      <span className="match-vs">vs</span>
                      <div className="team">
                        <span className="team-logo">CSK</span>
                        <span className="team-name">Chennai Super Kings</span>
                      </div>
                    </div>
                    <div className="match-info">
                      <span className="match-time">Today, 7:30 PM</span>
                      <button
                        className="btn btn-create-team"
                        onClick={() => navigate.push("/create-team")}
                      >
                        Create Team
                      </button>
                    </div>
                  </div>

                  <div className="match-card">
                    <div className="match-teams">
                      <div className="team">
                        <span className="team-logo">RCB</span>
                        <span className="team-name">Royal Challengers</span>
                      </div>
                      <span className="match-vs">vs</span>
                      <div className="team">
                        <span className="team-logo">KKR</span>
                        <span className="team-name">Kolkata Knight Riders</span>
                      </div>
                    </div>
                    <div className="match-info">
                      <span className="match-time">Tomorrow, 3:30 PM</span>
                      <button
                        className="btn btn-create-team"
                        onClick={() => navigate.push("/create-team")}
                      >
                        Create Team
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {showAddCash && <AddCash onClose={() => setShowAddCash(false)} />}
    </>
  );
}

export default Dashboard;
