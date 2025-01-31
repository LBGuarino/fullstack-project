import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile", "/dashboard", "/orders", "/shopping-bag"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Permitir acceso público a rutas no protegidas
  if (!protectedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value || "";

  try {
    // Verificar sesión usando el proxy
    const response = await fetch(`${req.nextUrl.origin}/api/users/session`, {
      headers: {
        Cookie: `token=${token}`,
      },
      cache: 'no-store'
    });

    // Actualizar cookies si es necesario
    const newCookies = response.headers.get('set-cookie');
    const responseToSend = newCookies 
      ? NextResponse.next() 
      : NextResponse.next();

    if (newCookies) {
      responseToSend.headers.set('set-cookie', newCookies);
    }

    // Redirigir si no está autenticado
    if (!response.ok) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    return responseToSend;

  } catch (error) {
    console.error("Error validating session:", error);
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/orders/:path*",
    "/profile/:path*",
    "/shopping-bag/:path*"
  ],
};