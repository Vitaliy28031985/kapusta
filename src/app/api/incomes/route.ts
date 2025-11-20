import { getIncomesData } from "@/app/get-data/getIncomes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, filter } = await req.json();

    const data = await getIncomesData(id, filter);

    return NextResponse.json({ success: true, data });
  } catch (e) {
    console.error(e, "Internal Error");
    return NextResponse.json(
      { success: false, error: "Internal Error" },
      { status: 500 }
    );
  }
}
