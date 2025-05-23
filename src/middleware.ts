
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This is a basic middleware function.
// It currently doesn't perform any specific logic other than letting the request proceed.
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

// Configure the matcher to specify which paths this middleware should run on.
// An empty array or a non-matching path means it won't actively run on any specific user routes.
// If you don't need middleware, this file can be deleted.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     *
     * This is a common default if you want middleware to run on most pages
     * but might be too broad for a simple one-page app.
     * For a one-page app, you might not need any middleware,
     * or you might restrict it to specific paths if any were to exist.
     * For now, to fix the parsing error and have a valid file, we'll use a restrictive matcher
     * that effectively does nothing for typical app routes.
     */
    // '/((?!api|_next/static|_next/image|favicon.ico).*)', // Example of a broader matcher
     '/this-path-will-not-match-anything-by-default', // Ensures it doesn't interfere
  ],
};
