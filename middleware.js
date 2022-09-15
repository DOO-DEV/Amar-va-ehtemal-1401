import { NextResponse } from "next/server";

export default async function middleware(req) {
  const signedinPages = ["/", "/admin", "/customer", "/admin/projects"];
  if (signedinPages.find((page) => page === req.nextUrl.pathname)) {
    const token = req.cookies.get("APP_TOKEN");
    if (!token) {
      return NextResponse.redirect(new URL("/sigin", req.url));
    }
  }
}
