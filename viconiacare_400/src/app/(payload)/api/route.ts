import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "payload-api",
  });
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 204 });
}
