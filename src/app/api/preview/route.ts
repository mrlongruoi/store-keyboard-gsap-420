import { NextRequest } from "next/server";
import { redirectToPreviewURL } from "@prismicio/next";

import { createClient } from "../../../prismicio";

/**
 * Initiates a Prismic preview redirect for the incoming request.
 *
 * @param request - The incoming Next.js request used to resolve the preview URL.
 * @returns A `Response` that redirects the client to the Prismic preview URL.
 */
export async function GET(request: NextRequest) {
  const client = createClient();

  return await redirectToPreviewURL({ client, request });
}
