import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile", "/dashboard", "/orders", "/shopping-bag"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value || "";

  try {
    const response = await fetch(`${req.nextUrl.origin}/api/users/session`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    const newCookies = response.headers.get('set-cookie');
    if (newCookies) {
      const res = NextResponse.next();
      res.headers.set('set-cookie', newCookies);
      return res;
    }
    
    return NextResponse.next();
  } catch (error) {
    console.error("Error al validar token:", error);
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/orders/:path*", "/profile/:path*", "/shopping-bag/:path*"],
};
