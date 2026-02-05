export default function BallLoader() {
  return (
    <div className="flex flex-col justify-center items-center">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <style>
          {`
          .spin {
            transform-origin: 50% 50%;
            animation: spin 1.1s linear infinite;
          }

          .dots {
            animation: dots 1.5s steps(3, end) infinite;
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes dots {
            0% { content:""; }
            33% { content:"."; }
            66% { content:".."; }
            100% { content:"..."; }
          }
          `}
        </style>

        <g className="spin">
          {/* Ball */}
          <circle cx="60" cy="60" r="40" fill="#c62828" />

          {/* Seam */}
          <path
            d="M40 20 C55 45,55 75,40 100"
            stroke="#fff"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M80 20 C65 45,65 75,80 100"
            stroke="#fff"
            strokeWidth="3"
            fill="none"
          />
        </g>
      </svg>

      {/* Loading text */}
      <div style={{ marginTop: 8, fontWeight: 500 }}>
        Loading<span className="dots">...</span>
      </div>
    </div>
  );
}
