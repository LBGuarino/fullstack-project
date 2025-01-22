import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile", "/dashboard", "/orders", "/shopping-bag"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  try {
    const response = await fetch(`http://localhost:3001/users/session`, {
      headers: {
        Cookie: req.headers.get("cookie") || "", // Pasa las cookies al backend
      },
    });

    if (response.status !== 200) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next(); // Token válido
  } catch (error) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/orders/:path*", "/profile/:path*", "/shopping-bag/:path*"],
};
