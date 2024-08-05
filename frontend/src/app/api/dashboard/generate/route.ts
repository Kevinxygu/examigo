// Route to post values to generate a practice problem
import { NextResponse } from "next/server";
import { TESTING_API_URL } from "@/app/constants/constants";

// interface type for the body of the request (TODO need to move to typescript types)
interface PostBody {
    pastedText: string;
    questionDescription: string;
}

// export async function GET(request: Request) {
//     const res = await fetch(`${TESTING_API_URL}/problems/generate`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   const data = await res.json();
//   return NextResponse.json(data);
// }

export async function POST(request: Request) {
    const body: PostBody = await request.json();
    const res = await fetch(`${TESTING_API_URL}/problems/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data);
}