import { NextResponse } from "next/server";
import { getOrCreateUser } from "@/lib/server/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, birthday } = body;

    if (!username || !birthday) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const user = await getOrCreateUser(username, birthday);
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials or unable to create user." },
        { status: 400 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.error("API /api/auth error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
