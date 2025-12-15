import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return NextResponse.next();

  const firstSegment = segments[0];
  const excludedPaths = ["uslugi", "salons", "login", "register", "api"];

  if (excludedPaths.includes(firstSegment)) {
    return NextResponse.next();
  }

  try {
    const decodedSlug = decodeURIComponent(firstSegment);

    const BASE_URL =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_BASE_URL_RELEASE
        : process.env.NEXT_PUBLIC_BASE_URL_TEST;

    const response = await fetch(
      `${BASE_URL}/city/chosen?citySlug=${encodeURIComponent(decodedSlug)}`
    );

    if (response.ok) {
      const cityData = await response.json();
      const cityId = cityData?.id?.toString();

      if (cityId) {
        const currentCityIdCookie = request.cookies.get("City_id");
        const currentCityId = currentCityIdCookie?.value;

        if (currentCityId !== cityId) {
          request.cookies.set("City_id", cityId);

          const nextResponse = NextResponse.next({
            request,
          });

          nextResponse.cookies.set("City_id", cityId, { path: "/" });

          return nextResponse;
        }
      }
    }
  } catch (error) {
    console.error(error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
