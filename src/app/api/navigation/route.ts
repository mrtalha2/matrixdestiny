import { NextResponse } from "next/server";
import { getNavigationConfig } from "@/lib/navigation/navigation-config";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const config = await getNavigationConfig();
    return NextResponse.json({ config });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch navigation" }, { status: 500 });
  }
}
