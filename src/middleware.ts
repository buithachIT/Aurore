import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from '@/config/routes';
import { STORAGE_KEY } from './config/storage';

const PUBLIC_ROUTES = [
  ROUTES.ABOUT,
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
];

const isPublicPath = (pathname: string) => {
  return (
    PUBLIC_ROUTES.includes(pathname) ||
    /^\/product\/[^\/]+$/.test(pathname)
  );
};
const PUBLIC_FILE = /\.(png|jpg|jpeg|gif|svg|webp|avif|css|js|ico|json|woff|woff2|ttf|eot)$/i;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(STORAGE_KEY.REFRESH_TOKEN)?.value;

  if ((pathname === ROUTES.LOGIN || pathname === ROUTES.REGISTER) && token) {
    return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  }

  if (PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};