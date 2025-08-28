// app/api/set-session/route.ts
import { BACKEND_URL } from "@/app/constants";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { session_id } = body;

    if (!session_id) {
      return NextResponse.json(
        { error: "Missing session_id" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${BACKEND_URL}/auth/shopify/session?session_id=${session_id}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Backend API failed" },
        { status: 500 }
      );
    }

    const data = await response.json();

    // 2️⃣ Set cookie on server
    const xxResponse = NextResponse.json({
      success: true,
      session_id: session_id,
    });
    xxResponse.cookies.set({
      name: "session_id",
      value: session_id,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });

    return xxResponse;
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
