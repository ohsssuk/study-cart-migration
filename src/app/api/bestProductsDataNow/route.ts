import { NextResponse } from "next/server";
import { initCartList } from "../data";

export async function GET() {
  return NextResponse.json(initCartList);
}
