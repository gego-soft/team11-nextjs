// contexts/BalanceContext.tsx
"use client";
import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState,
} from "react";
import { balanceService } from "@/services/MyWallet/balance";
import { AxiosError } from "axios";

interface BalanceData {
  balance: string;
  currency_code: string;
  currency_symbol: string;
}

interface BalanceContextType {
  balanceData: BalanceData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  updateBalance: (newBalance: string) => void;
}

const BalanceContext = createContext<BalanceContextType | null>(null);

export const BalanceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [balanceData, setBalanceData] = useState<BalanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await balanceService.getBalance();
      setBalanceData(response.data);
    } catch (error) {
      const err = error as AxiosError<{
        message: string;
        errors?: Record<string, string[]>;
      }>;
      setError(err.message || "Failed to fetch balance");
      console.error("Error fetching balance:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to manually update balance locally
  const updateBalance = useCallback((newBalance: string) => {
    setBalanceData((prev) =>
      prev
        ? {
            ...prev,
            balance: newBalance,
          }
        : null,
    );
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  // Listen for global balance refresh events
  useEffect(() => {
    const handleBalanceRefresh = () => {
      fetchBalance();
    };

    // Custom event listener
    window.addEventListener("refreshBalance", handleBalanceRefresh);

    // Message listener for iframe/postMessage scenarios
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "balanceUpdated") {
        fetchBalance();
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("refreshBalance", handleBalanceRefresh);
      window.removeEventListener("message", handleMessage);
    };
  }, [fetchBalance]);

  return (
    <BalanceContext.Provider
      value={{
        balanceData,
        loading,
        error,
        refetch: fetchBalance,
        updateBalance,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => {
  const ctx = useContext(BalanceContext);
  if (!ctx) {
    throw new Error("useBalance must be used within BalanceProvider");
  }
  return ctx;
};
