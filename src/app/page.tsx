import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

/**
 * Renders the homepage SliceZone by fetching the "homepage" document from Prismic.
 *
 * If the homepage cannot be fetched, invokes `notFound()` to render a 404.
 *
 * @returns A React element rendering a `SliceZone` with the homepage's slices and the configured components mapping.
 */
export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("homepage").catch(() => notFound());

  return <SliceZone slices={page.data.slices} components={components} />;
}

/**
 * Builds the page metadata for the homepage from CMS content.
 *
 * @returns A Metadata object containing:
 * - `title`: the homepage `meta_title`
 * - `description`: the homepage `meta_description`
 * - `openGraph.images`: an array with one image whose `url` is derived from `page.data.meta_image` or `""` if missing
 */
export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}