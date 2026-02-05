"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useSidebar } from "@/context/SidebarContext"; 

function Sidebar() {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  const { isOpen, closeSidebar } = useSidebar(); 




  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "My Teams", path: "/my-teams" },
    { name: "Contests", path: "/contests" },
    { name: "Matches", path: "/matches" },
    { name: "My Contests", path: "/my-contests" },
    { name: "Game Simulator", path: "/game-simulator" },
    { name: "My Wallet", path: "/my-wallet" },
  ];

  if (!user && !isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 bg-opacity-50 z-55"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        id="mobile-sidebar"
        className={`
          lg:hidden fixed top-0 left-0 h-full w-64 bg-white z-60 block 
          transform transition-transform duration-300 ease-in-out
          shadow-xl
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <nav className="p-6 h-full overflow-y-auto">
          <Link
            href="/"
            className="no-underline "
            // onClick={closeAllModals}
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
          <ul className="space-y-1 mt-2">
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
                    onClick={closeSidebar}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Desktop Sidebar (unchanged) */}
      <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-72px)] sticky top-18">
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
