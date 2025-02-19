import { NextResponse } from "next/server";
import { initCartList } from "../data";
import { delay } from "@/util/common";

export async function GET() {
  await delay(1000);

  return NextResponse.json(initCartList);
}
