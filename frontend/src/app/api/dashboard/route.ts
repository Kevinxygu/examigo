// Route to get dashboard values
import { NextResponse } from "next/server";
import { TESTING_API_URL } from "@/app/constants/constants";

export async function GET(request: Request) {
  const res = await fetch(`${TESTING_API_URL}/problems`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return NextResponse.json(data);
}