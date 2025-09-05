import type { NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

export async function middleware(request: NextRequest) {
  // https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md#middleware-2
  // AFAIK this refresh the token if it's expired, read the docs above for more details(250905, sh)
  const authRes = await auth0.middleware(request);
  const session = await auth0.getSession(request);

  if (!session) {
    return authRes;
  }

  await auth0.getAccessToken(request, authRes);

  return authRes;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
