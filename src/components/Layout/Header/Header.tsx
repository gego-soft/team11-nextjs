"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Button from "../../Button";
import Registration from "@/components/Auth/Registration";
import Login from "@/components/Auth/Login";
import ForgotPasswordModal from "@/components/Auth/ForgotPasswordModal";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeModal, setActiveModal] = useState<"login" | "register" | "forgot" | null>(null);

  const isAuthenticated = false;

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    setShowDropdown(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[96%] mx-auto py-4 px-8 flex justify-between items-center">
          <Link href="/" className="no-underline">
            <div className="flex flex-col gap-0.5 relative">
              <h2 className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent text-2xl font-extrabold m-0 leading-tight tracking-tight relative">
                Team 11
              </h2>
              <span className="bg-linear-to-r from-slate-500 via-slate-400 to-slate-500 bg-clip-text text-transparent text-xs font-semibold tracking-widest uppercase opacity-90">
                Fantasy Cricket League
              </span>
            </div>
          </Link>

          <nav className="flex gap-4 items-center">
            {isAuthenticated ? (
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-blue-600 transition-transform hover:scale-105"
                  onClick={toggleDropdown}
                >
                  <Image
                    src="https://ui-avatars.com/api/?name=User&background=2563eb&color=fff"
                    alt="User"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>

                {showDropdown && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg min-w-37.5 overflow-hidden z-50">
                    <Link
                      href="/profile"
                      className="block w-full px-4 py-3 text-left text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors text-sm font-medium no-underline"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </Link>
                    <button
                      className="block w-full px-4 py-3 text-left text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors text-sm font-medium border-none bg-none cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setActiveModal("register")}
                >
                  SIGN UP
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setActiveModal("login")}
                >
                  LOGIN
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Modals */}
      {activeModal === "login" && (
        <Login
          onClose={() => setActiveModal(null)}
          onSwitchToRegister={() => setActiveModal("register")}
          onSwitchToForgot={() => setActiveModal("forgot")}
        />
      )}

      {activeModal === "register" && (
        <Registration
          onClose={() => setActiveModal(null)}
          onSwitchToLogin={() => setActiveModal("login")}
        />
      )}

      {activeModal === "forgot" && (
        <ForgotPasswordModal
          onClose={() => setActiveModal(null)}
          onSwitchToLogin={() => setActiveModal("login")}
        />
      )}
    </>
  );
}