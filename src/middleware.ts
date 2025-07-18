import { NextResponse, type NextRequest } from 'next/server';

// Fonction de vérification d'authentification
// ===========================================================================================
function isAuthenticated(request: NextRequest) {
  const token: string | undefined = request.cookies.get('token')?.value;
  return Boolean(token);
}

// Middleware pour gérer la sécurité et l'accès aux pages selon la validité de la session utilisateur
// ===========================================================================================
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoggedIn: boolean = isAuthenticated(request);

  // Pages accessibles seulement si non connecté
  const guestOnlyRoutes: string[] = [
    '/vl/home',
    '/vl/account/login',
    '/vl/account/signup',
    '/vl/account/reset-password',
  ];

  // Pages accessibles seulement si connecté
  const authOnlyRoutes: string[] = ['/vl/account/settings'];

  const isGuestOnly: boolean = guestOnlyRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthOnly: boolean =
    pathname.startsWith('/vl/links') ||
    authOnlyRoutes.some((route) => pathname.startsWith(route));

  // Redirige les utilisateurs connectés hors des pages guest
  if (isGuestOnly && isLoggedIn)
    return NextResponse.redirect(new URL('/vl/links/my-links', request.url));

  // Redirige les utilisateurs non connectés
  if (isAuthOnly && !isLoggedIn)
    return NextResponse.redirect(new URL('/vl/account/login', request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ['/vl/:path*'], // Cible les routes du dashboard
};
