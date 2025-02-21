"use server";

import { cookies } from "next/headers";
import { randomUUID } from "crypto";

// 쿠키를 설정하는 함수
export async function setCustomerId() {
  const cookieStore = await cookies();
  const customerId = randomUUID();

  console.log("server");

  // 쿠키 설정
  cookieStore.set("customerId", customerId, {
    maxAge: 60 * 60,
    path: "/",
  });

  return customerId;
}
