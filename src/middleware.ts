import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// middleware is applied to all routes, use conditionals to select

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/login") &&
      req.nextauth.token !== null
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname.includes("dashboard") && token === null) {
          return false;
        }
        return true;
      },
    },
  },
);

export const config = { matcher: ["/dashboard", "/login"] };
