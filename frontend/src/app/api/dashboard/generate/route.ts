// Route to post values to generate a practice problem
import { NextResponse } from "next/server";
import { TESTING_API_URL } from "@/app/constants/constants";

// interface type for the body of the request (TODO need to move to typescript types)
// interface PostBody {
//     pastedText: string;
//     questionDescription: string;
// }

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

  // refactored to use FormData from JSON (since we have file uploads and it can be better to use FormData)
  const formData = await request.formData();

  // Create a new FormData object
  const body = new FormData();
  body.append('pastedText', formData.get('pastedText') as string);
  body.append('questionDescription', formData.get('questionDescription') as string);

  // Check if file exists
  const uploadedFile = formData.get('uploadedFile') as File | null;
  if (uploadedFile) {
    body.append('uploadedFile', uploadedFile);
  }

  // send a POST request to the Flask API
  const res = await fetch(`${TESTING_API_URL}/problems/generate`, {
  method: 'POST',
  body: body,
});

  const data = await res.json();
  return NextResponse.json(data);
}