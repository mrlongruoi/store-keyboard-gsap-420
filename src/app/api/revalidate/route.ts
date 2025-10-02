import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

/**
 * Trigger revalidation for the "prismic" cache tag and return a JSON result.
 *
 * @returns A NextResponse whose JSON payload is an object with `revalidated: true` and `now` set to the current timestamp.
 */
export async function POST() {
  revalidateTag("prismic");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
