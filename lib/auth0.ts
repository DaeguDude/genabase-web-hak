// lib/auth0.js

import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { NextResponse } from "next/server";
import { OnCallbackHook } from "@auth0/nextjs-auth0/types";

export const onCallback: OnCallbackHook = async (error, context, session) => {
  if (error) {
    return NextResponse.redirect(new URL(`/error`, process.env.APP_BASE_URL));
  }

  const accessToken = session?.tokenSet.accessToken;
  const user = session?.user;

  const res = await fetch("https://backend.staging.genabase.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(user),
  });

  const data = await res.json();
  if (res.status !== 200 || !data) {
    return NextResponse.redirect(new URL(`/error`, process.env.APP_BASE_URL));
  }

  return NextResponse.redirect(
    new URL(context.returnTo || "/", process.env.APP_BASE_URL)
  );
};

export const auth0 = new Auth0Client({
  // Options are loaded from environment variables by default
  // Ensure necessary environment variables are properly set
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  appBaseUrl: process.env.APP_BASE_URL,
  secret: process.env.AUTH0_SECRET,

  authorizationParameters: {
    // In v4, the AUTH0_SCOPE and AUTH0_AUDIENCE environment variables for API authorized applications are no longer automatically picked up by the SDK.
    // Instead, we need to provide the values explicitly.
    scope: process.env.AUTH0_SCOPE,
    audience: process.env.AUTH0_AUDIENCE,
  },

  // https://github.com/auth0/nextjs-auth0/blob/main/EXAMPLES.md#oncallback
  onCallback,
});
