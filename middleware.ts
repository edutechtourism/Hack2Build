// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "./server/login";

const PROTECTED_ROUTES = ["/dashboard", "/register_actions"] as const;

export default async function middleware(request: NextRequest) {
  const session = await isLoggedIn();

  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}
