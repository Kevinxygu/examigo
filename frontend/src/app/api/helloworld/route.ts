// Testing route to the backend server
import { NextResponse } from "next/server";
import { TESTING_API_URL } from "@/app/constants/constants";

export async function GET(request: Request) {
  const res = await fetch(`${TESTING_API_URL}/helloworld`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return NextResponse.json(data);
}

// This is the interface for the body of the POST request (testing)
interface PostBody {
    number: number;
    text: string;
}

export async function POST(request: Request) {
  const body: PostBody = await request.json();
  const res = await fetch(`${TESTING_API_URL}/helloworld`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data);
}