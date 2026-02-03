"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setToken } from "@/store/slices/authSlice";
import { getProfile } from "@/store/slices/authThunks";
import Cookies from "js-cookie";

export default function AuthInitializer() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    const initializeAuth = async () => {
      if (typeof window !== "undefined") {
        const token = Cookies.get("userToken");

        if (token && !isAuthenticated && !isLoading) {
          // Set token first
          dispatch(setToken(token));

          // Then fetch user profile
          try {
            await dispatch(getProfile()).unwrap();
          } catch (error) {
            console.log("Failed to fetch profile:", error);
            Cookies.remove("userToken");
          }
        }
      }
    };

    initializeAuth();
  }, [dispatch, isAuthenticated, isLoading]);

  return null;
}
