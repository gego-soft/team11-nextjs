import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const token = req.cookies.get("userToken")?.value;
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const defaultRoutes = ["/dashboard", "/profile"];

  const isDefaultRoute = defaultRoutes.some(
    (r) => pathname === r || pathname.startsWith(`${r}/`),
  );

  // 🚫 apiKey missing → allow only /
  if (!apiKey && pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🚫 Guest accessing protected pages
  if (!token && isDefaultRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ✅ Logged user opening root → dashboard
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
