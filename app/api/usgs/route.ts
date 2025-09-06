import { NextResponse } from "next/server";
import axios from "axios";

const USGS_API = "https://m2m.cr.usgs.gov/api/api/json/stable";

export async function GET() {
  try {
    const res = await axios.post(`${USGS_API}/login-token`, {
      username: process.env.USGS_USERNAME,
      token: process.env.USGS_TOKEN,
    });

    const { data, sessionId, errorMessage } = res.data;
    if (!data || !sessionId) {
      throw new Error(errorMessage || "Login failed");
    }

    return NextResponse.json({ apiKey: data, sessionId });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("USGS login error:", err.message);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }

    if (typeof err === "object" && err && "response" in err) {
      const e = err as { response?: { data?: unknown } };
      console.error("USGS login error:", e.response?.data || "Unknown error");
      return NextResponse.json({ error: "USGS request failed" }, { status: 500 });
    }

    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
