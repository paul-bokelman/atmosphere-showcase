import { NextRequest } from "next/server";

export const config = {
  matcher: "/api/:function*",
};

export const isAuthenticated = (req: NextRequest) => {
  return false;
};

export function middleware(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return Response.json({ success: false, message: "authentication failed" }, { status: 401 });
  }
}
