// contexts/BalanceContext.tsx
"use client";
import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState,
  useRef,
} from "react";
import { balanceService } from "@/services/MyWallet/balance";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use ref to prevent multiple calls
  const hasFetched = useRef(false);
  const isFetching = useRef(false);

  // Check if user is logged in
  const isLoggedIn = useCallback(() => {
    const token = Cookies.get("userToken");
    return !!token;
  }, []);

  const fetchBalance = useCallback(async () => {
    // Only fetch if user is logged in
    if (!isLoggedIn()) {
      console.log("User not logged in, skipping balance fetch");
      setBalanceData(null);
      setLoading(false);
      return;
    }

    // Prevent multiple simultaneous calls
    if (isFetching.current) {
      console.log("Already fetching balance, skipping");
      return;
    }

    try {
      console.log("🔄 Fetching balance...");
      isFetching.current = true;
      setLoading(true);
      setError(null);
      
      const response = await balanceService.getBalance();
      console.log("✅ Balance fetched:", response.data);
      setBalanceData(response.data);
      
    } catch (error) {
      const err = error as AxiosError<{
        message: string;
        errors?: Record<string, string[]>;
      }>;
      setError(err.message || "Failed to fetch balance");
      console.error("❌ Error fetching balance:", err);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, [isLoggedIn]);

  // Initial fetch - only once when component mounts
  useEffect(() => {
    if (hasFetched.current) return;
    
    console.log("🏁 Initial balance fetch");
    hasFetched.current = true;
    fetchBalance();
  }, [fetchBalance]);

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

  // Listen for login/logout events
  useEffect(() => {
    const checkAuthAndFetch = () => {
      if (isLoggedIn() && !balanceData) {
        console.log("🔄 User logged in, fetching balance...");
        fetchBalance();
      } else if (!isLoggedIn() && balanceData) {
        console.log("🚪 User logged out, clearing balance");
        setBalanceData(null);
        hasFetched.current = false;
      }
    };

    // Check auth every 5 seconds (adjust as needed)
    const interval = setInterval(checkAuthAndFetch, 5000);
    
    return () => clearInterval(interval);
  }, [isLoggedIn, balanceData, fetchBalance]);

  // Listen for global balance refresh events
  useEffect(() => {
    const handleBalanceRefresh = () => {
      console.log("🎯 Manual balance refresh triggered");
      fetchBalance();
    };

    window.addEventListener("refreshBalance", handleBalanceRefresh);
    
    // Listen for login success events
    const handleLoginSuccess = () => {
      console.log("🔓 Login success, fetching balance");
      hasFetched.current = false;
      fetchBalance();
    };
    
    window.addEventListener("loginSuccess", handleLoginSuccess);

    return () => {
      window.removeEventListener("refreshBalance", handleBalanceRefresh);
      window.removeEventListener("loginSuccess", handleLoginSuccess);
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