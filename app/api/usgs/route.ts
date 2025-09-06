import { NextResponse } from "next/server";
import { searchScenes } from "@/services/UsgsService";
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
  } catch (err: any) {
    console.error("USGS login error:", err.response?.data || err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
