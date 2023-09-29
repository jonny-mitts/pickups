// app/api/route.js 👈🏽

import Server, { NextResponse } from 'next/server';

// To handle a GET request to /api
export async function GET(request) {
  // Do whatever you want
  return await Server.NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request) {
  // Do whatever you want
  return Server.NextResponse.json({ message: "Hello World" }, { status: 200 });
}
