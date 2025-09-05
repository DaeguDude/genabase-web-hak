import { NextResponse } from "next/server";

import { auth0 } from "@/lib/auth0";

export async function GET() {
  try {
    await auth0.getAccessToken();
  } catch (err) {}

  return NextResponse.json({
    message: "Success!",
  });
}
