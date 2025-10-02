import {
  SliceSimulator,
  SliceSimulatorParams,
  getSlices,
} from "@slicemachine/adapter-next/simulator";
import { SliceZone } from "@prismicio/react";

import { components } from "../../slices";

/**
 * Render a slice simulator page that previews slices derived from the provided URL state.
 *
 * The component awaits `searchParams` to extract `state`, computes slice data from that state,
 * and renders a SliceSimulator containing a SliceZone wired to the computed slices and local components.
 *
 * @param searchParams - An object (or promise resolving to an object) containing URL-derived state used to compute slices
 * @returns A React element that renders the slice simulator with the derived slices
 */
export default async function SliceSimulatorPage({
  searchParams,
}: SliceSimulatorParams) {
  const { state } = await searchParams;
  const slices = getSlices(state);

  return (
    <SliceSimulator>
      <SliceZone slices={slices} components={components} />
    </SliceSimulator>
  );
}
