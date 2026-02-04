// import { balanceService } from "@/services/MyWallet/balance";
// import { useState, useEffect } from "react";

// interface BalanceData {
//   balance: string;
//   currency_code: string;
//   currency_symbol: string;
// }

// interface BalanceComponentProps {
//   hasInvitationBonus?: boolean;
//   bonusAmount?: number;
//   className?: string;
//   showCashbtn?: boolean;
// }

// const BalanceComponent: React.FC<BalanceComponentProps> = ({
//   hasInvitationBonus = false,
//   bonusAmount = 5000,
//   className = "",
//   showCashbtn = true,
// }) => {
//   const [balanceData, setBalanceData] = useState<BalanceData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [showAddCash, setShowAddCash] = useState(false);

//   const fetchBalance = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await balanceService.getBalance();
//       setBalanceData(response.data);
//     } catch (err) {
//       setError("Failed to fetch balance");
//       console.error("Error fetching balance:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBalance();
//   }, []);

//   if (loading) {
//     return (
//       <div
//         className={`flex items-center gap-4 bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-sm ${className}`}
//       >
//         <div className="flex-1 flex items-center gap-4 flex-wrap">
//           <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
//           <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
//         </div>
//         <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div
//         className={`flex items-center justify-between bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-sm ${className}`}
//       >
//         <div className="text-red-500">{error}</div>
//         <button
//           onClick={fetchBalance}
//           className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors text-sm sm:text-base"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div
//         className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-sm ${className}`}
//       >
//         <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-wrap">
//           <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
//             <span className="text-gray-500 font-medium text-sm sm:text-base">
//               Balance:
//             </span>
//             <span className="text-lg sm:text-xl font-bold text-emerald-600">
//               {balanceData?.currency_symbol}
//               {parseFloat(balanceData?.balance || "0").toLocaleString()}
//             </span>
//           </div>

//           {hasInvitationBonus && (
//             <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-linear-to-r from-yellow-500 to-amber-500 animate-pulse">
//               🎉 +{balanceData?.currency_symbol || "₹"}
//               {bonusAmount.toLocaleString()} Bonus
//             </span>
//           )}
//         </div>

//         {showCashbtn && (
//           <button
//             className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-5 py-2 rounded-md font-semibold transition-colors text-sm sm:text-base w-full sm:w-auto cursor-pointer"
//             onClick={() => setShowAddCash(true)}
//           >
//             Add Cash
//           </button>
//         )}
//       </div>

//       {/* {showAddCash && (
//         <AddCashModal
//           isOpen={showAddCash}
//           onClose={() => setShowAddCash(false)}
//           onSuccess={fetchBalance}
//           currencySymbol={balanceData?.currency_symbol || '₹'}
//         />
//       )} */}
//     </>
//   );
// };

// export default BalanceComponent;


// components/BalanceComponent.tsx
"use client";
import { useBalance } from "@/context/BalanceContext";
import { useState } from "react";

interface BalanceComponentProps {
  hasInvitationBonus?: boolean;
  bonusAmount?: number;
  className?: string;
  showCashbtn?: boolean;
}

const BalanceComponent: React.FC<BalanceComponentProps> = ({
  hasInvitationBonus = false,
  bonusAmount = 5000,
  className = "",
  showCashbtn = true,
}) => {
  const {
    balanceData,
    
    refetch,
    updateBalance
  } = useBalance();
  const [showAddCash, setShowAddCash] = useState(false);



  
  return (
    <>
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-sm ${className}`}
      >
        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <span className="text-gray-500 font-medium text-sm sm:text-base">
              Balance:
            </span>
            <span className="text-lg sm:text-xl font-bold text-emerald-600">
              {balanceData?.currency_symbol}
              {parseFloat(balanceData?.balance || "0").toLocaleString()}
            </span>
          </div>

          {hasInvitationBonus && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-linear-to-r from-yellow-500 to-amber-500 animate-pulse">
              🎉 +{balanceData?.currency_symbol || "₹"}
              {bonusAmount.toLocaleString()} Bonus
            </span>
          )}
        </div>

        {showCashbtn && (
          <button
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-5 py-2 rounded-md font-semibold transition-colors text-sm sm:text-base w-full sm:w-auto cursor-pointer"
            onClick={() => setShowAddCash(true)}
          >
            Add Cash
          </button>
        )}
      </div>

      {/* AddCashModal Example */}
      {/* {showAddCash && (
        <AddCashModal
          isOpen={showAddCash}
          onClose={() => setShowAddCash(false)}
          onSuccess={() => {
            // Option 1: Refetch from server
            refetch();
            
            // Option 2: Update locally if you know the exact amount
            // updateBalance("150.00");
            
            // Option 3: Trigger global refresh
            window.dispatchEvent(new Event("refreshBalance"));
          }}
          currencySymbol={balanceData?.currency_symbol || '₹'}
        />
      )} */}
    </>
  );
};

export default BalanceComponent;