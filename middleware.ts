// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "./server/SIWE";

export const PROTECTED_ROUTES = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/regenerative_actions", label: "Regenerative actions" },
] as const;

export default async function middleware(request: NextRequest) {
  const session = await isLoggedIn();

  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((_) => pathname.startsWith(_.path));

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}
