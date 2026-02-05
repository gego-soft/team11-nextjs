"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Button from "../../Button";
import Registration from "@/components/Auth/Registration";
import Login from "@/components/Auth/Login";
import ForgotPasswordModal from "@/components/Auth/ForgotPasswordModal";
import { useAuth } from "@/hooks/useAuth";
import {
  FaUser,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
  FaBars,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { RiLockPasswordFill } from "react-icons/ri";
import BalanceComponent from "@/components/MyWallet/BalanceComponent";
import { MdPrivacyTip } from "react-icons/md";
import { useSidebar } from "@/context/SidebarContext";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeModal, setActiveModal] = useState<
    "login" | "register" | "forgot" | null
  >(null);
  const { toggleSidebar } = useSidebar();
  const router = useRouter();

  // Use Redux auth hook
  const { user, isAuthenticated, logout } = useAuth();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    await logout();

    setShowDropdown(false);
  };

  const closeAllModals = () => {
    router.push("/");
    setActiveModal(null);
    setShowDropdown(false);
  };
  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[96%] mx-auto py-4 md:px-8 px-3 flex justify-between items-center">
          <Link
            href="/"
            className="no-underline hidden lg:block"
            onClick={closeAllModals}
          >
            <div className="flex flex-col gap-0.5 relative">
              <h2 className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent text-2xl font-extrabold m-0 leading-tight tracking-tight relative">
                Team 11
              </h2>
              <span className="bg-linear-to-r from-slate-500 via-slate-400 to-slate-500 bg-clip-text text-transparent text-xs font-semibold tracking-widest uppercase opacity-90">
                Fantasy Cricket League
              </span>
            </div>
          </Link>
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-blue-600"
            onClick={(e) => {
              e.stopPropagation();

              toggleSidebar();
            }}
          >
            <FaBars size={24} />
          </button>

          <nav className="flex gap-4 items-center">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <div>
                  <BalanceComponent showCashbtn={false} />
                </div>
                {/* Welcome Message */}
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-slate-600 text-sm font-medium">
                    Welcome,
                  </span>
                  <span className="text-blue-600 font-semibold capitalize">
                    {user.name || user.firstname || "User"}
                  </span>
                </div>

                {/* User Profile with Dropdown */}
                <div className="relative">
                  <button
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border-none bg-transparent"
                    onClick={toggleDropdown}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-600">
                      {user.profile_img_url ? (
                        <Image
                          src={user.profile_img_url}
                          alt={user.name || "User"}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full bg-blue-600 flex items-center justify-center">
                          <FaUser className="text-white text-lg" />
                        </div>
                      )}
                    </div>
                    {showDropdown ? (
                      <FaChevronUp className="text-slate-500 text-sm" />
                    ) : (
                      <FaChevronDown className="text-slate-500 text-sm" />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowDropdown(false)}
                      />

                      {/* Dropdown Content */}
                      <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl min-w-48 overflow-hidden z-50 border border-slate-200">
                        {/* User Info Section */}
                        <div className="px-4 py-3 border-b border-slate-100">
                          <p className="text-slate-700 font-semibold truncate capitalize">
                            {user.name || user.firstname || "User"}
                          </p>
                          <p className="text-slate-500 text-sm truncate">
                            {user.email}
                          </p>
                        </div>

                        {/* Menu Items */}
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-3 text-left text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors text-sm font-medium no-underline border-none bg-transparent w-full cursor-pointer"
                          onClick={() => setShowDropdown(false)}
                        >
                          <FaUser className="text-slate-500" />
                          Profile
                        </Link>
                        <Link
                          href="/change-password"
                          className="flex items-center gap-3 px-4 py-3 text-left text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors text-sm font-medium no-underline border-none bg-transparent w-full cursor-pointer"
                          onClick={() => setShowDropdown(false)}
                        >
                          <RiLockPasswordFill className="text-slate-500" />
                          Change Password
                        </Link>
                        <Link
                          href="/kyc"
                          className="flex items-center gap-3 px-4 py-3 text-left text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors text-sm font-medium no-underline border-none bg-transparent w-full cursor-pointer"
                          onClick={() => setShowDropdown(false)}
                        >
                          <MdPrivacyTip className="text-slate-500" />
                          Update KYC
                        </Link>

                        <button
                          className="flex items-center gap-3 px-4 py-3 text-left text-slate-700 hover:bg-slate-50 hover:text-red-600 transition-colors text-sm font-medium border-none bg-transparent w-full cursor-pointer"
                          onClick={handleLogout}
                        >
                          <FaSignOutAlt className="text-slate-500" />
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
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
