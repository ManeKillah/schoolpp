import type {NextRequest} from "next/server";

import {NextResponse} from "next/server";

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  const searchParams = request.nextUrl.searchParams.toString();

  headers.set("x-pathname", `${request.nextUrl.pathname}${searchParams ? `?${searchParams}` : ""}`);

  return NextResponse.next({
    request: {
      headers,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
