"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

function Sidebar() {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "My Teams", path: "/my-teams" },
    { name: "Contests", path: "/contests" },
    { name: "Matches", path: "/matches" },
    { name: "My Contests", path: "/my-contests" },
    { name: "Game Simulator", path: "/game-simulator" },
    { name: "My Wallet", path: "/my-wallet" },
    { name: "Profile", path: "/profile" },
  ];

  if (!user && !isAuthenticated) {
    return null;
  }
  return (
    <>
      {/* Mobile Navigation (Horizontal Scroll) */}
      <div className="lg:hidden bg-white border-b border-gray-200 py-2 px-4 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {navItems.map((item) => {
            const isActive =
              pathname === item.path ||
              (item.path !== "/dashboard" && pathname?.startsWith(item.path));

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-72px)] sticky top-18">
        {/* Navigation */}
        <nav className="p-6">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.path ||
                (item.path !== "/dashboard" && pathname?.startsWith(item.path));

              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`
                      block py-3 px-4 text-gray-700 font-medium rounded-lg transition-all duration-200
                      hover:bg-gray-50 hover:text-blue-600
                      ${isActive ? "bg-blue-600 text-white" : ""}
                    `}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
