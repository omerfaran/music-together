// this file must be named middleware.ts in order to work

import { NextResponse } from "next/server";
import { auth } from "./auth";
import { authRoutes, publicRoutes } from "./routes";

export default auth((req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  const isProfileComplete = req.auth?.user.profileComplete;

  // if user wants to go to a public route, we just let them in,
  // not caring if they're authenticated or not
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // if route is the login or register route
  if (isAuthRoute) {
    // if we're logged in, there's nothing to do in auth routes, so we're redirected
    // to members page
    if (isLoggedIn) {
      // nextUrl is just the base route of our app,
      // so new URL with members and nextUrl is just our base+/members
      return NextResponse.redirect(new URL("/members", nextUrl));
    }
    // if they're not logged in, let them reach the auth routes (login/register)
    return NextResponse.next();
  }

  // protected route and we're not logged in, send em to login
  if (!isPublicRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  if (
    isLoggedIn &&
    !isProfileComplete &&
    nextUrl.pathname !== "/complete-profile"
  ) {
    return NextResponse.redirect(new URL("/complete-profile", nextUrl));
  }

  // after all checks above, we can let them through with whatever
  return NextResponse.next();
});

export const config = {
  // this will pass us to the middleware above only in case of regex match below.
  // This regex is a negative look ahead taken from: https://nextjs.org/docs/app/building-your-application/routing/middleware
  // It checks if route doesn't include "api", or "next/images" and so on.
  // If it doesn't, then pass to middleware for our checks, but if route does include
  // "api", we don't need to use our middleware since it's a route used by our server
  // we basically only want to check routes used by the user in our middleware.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
