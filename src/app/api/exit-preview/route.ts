import { exitPreview } from "@prismicio/next";

/**
 * Exit Prismic preview mode for the current request.
 *
 * @returns A Response that completes the preview exit operation. 
 */
export function GET() {
  return exitPreview();
}
