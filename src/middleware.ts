import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth/admin-auth";

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (svg, png, jpg, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)",
  ],
};

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // 1. Admin Route Protection (Fail closed)
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";
  const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (isAdminRoute) {
    let session = null;
    try {
      session = await verifySessionToken(sessionCookie);
    } catch {
      // Fails closed if session secret is missing or error thrown
      session = null;
    }

    if (isLoginPage) {
      if (session) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
      return NextResponse.next();
    }

    if (!session) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("next", pathname + search);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}
