import type { NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

// https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md#middleware-2
export async function middleware(request: NextRequest) {
  return await auth0.middleware(request);
}

// September 5, 2025 at 19:41
// ⨯ [Error: Cannot append headers after they are sent to the client] {
// 6d4a89cce7a34031a4f6f96d1bc873f6
// genabase-web
// September 5, 2025 at 19:41
// code: 'ERR_HTTP_HEADERS_SENT'
// 6d4a89cce7a34031a4f6f96d1bc873f6
// genabase-web
// September 5, 2025 at 19:41
// }
// 6d4a89cce7a34031a4f6f96d1bc873f6
// genabase-web
// September 5, 2025 at 19:41
// ⨯ [Error: Cannot append headers after they are sent to the client] {
// 6d4a89cce7a34031a4f6f96d1bc873f6
// genabase-web
// September 5, 2025 at 19:41
// code: 'ERR_HTTP_HEADERS_SENT'
// 6d4a89cce7a34031a4f6f96d1bc873f6
// genabase-web
// September 5, 2025 at 19:41
// }
// 6d4a89cce7a34031a4f6f96d1bc873f6
// genabase-web
// September 5, 2025 at 19:41
// e6: decryption operation failed
// const authRes = await auth0.middleware(request);
//   const session = await auth0.getSession(request);

//   if (!session) {
//     return authRes;
//   }

//   await auth0.getAccessToken(request, authRes);

//   return authRes;

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
