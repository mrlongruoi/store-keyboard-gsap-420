import { FC } from "react";
import { asText, Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { FadeIn } from "@/components/FadeIn";

/**
 * Props for `BentoBox`.
 */
export type BentoBoxProps = SliceComponentProps<Content.BentoBoxSlice>;

/**
 * Component for "BentoBox" Slices.
 */
const BentoBox: FC<BentoBoxProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <FadeIn>
        <h2
          id="features"
          className="font-bold-slanted mb-8 scroll-pt-6 text-6xl uppercase md:text-8xl"
        >
          <PrismicText field={slice.primary.heading} />
        </h2>
      </FadeIn>

      <FadeIn targetChildren className="grid grid-cols-1 gap-4 md:grid-cols-6">
        {slice.primary.items.map((item, i) => (
          <BentoBoxItem key={asText(item.text) || i} item={item} index={i} />
        ))}
      </FadeIn>
    </Bounded>
  );
};

export default BentoBox;

type BentoBoxItemProps = {
  item: Content.BentoBoxSliceDefaultPrimaryItemsItem;
  index: number;
};

/**
 * Render a single BentoBox grid item with its image, gradient overlay, and caption.
 *
 * @param item - The slice item containing `image`, `text`, and optional `size` used to determine the item's grid span.
 * @param index - Zero-based position of the item within the slice; used to select a predefined layout span.
 * @returns The rendered grid cell element containing the item image, a bottom gradient, and the rich-text caption.
 */
function BentoBoxItem({ item, index }: BentoBoxItemProps) {
  const spanClass = getSpanClass(item, index);

  return (
    <div className={clsx("relative overflow-hidden rounded-3xl", spanClass)}>
      <PrismicNextImage
        field={item.image}
        className="h-full w-full object-cover"
        quality={96}
        width={700}
        fallbackAlt=""
      />

      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-black" />

      <div className="absolute bottom-0 left-0 max-w-xl p-6 text-xl text-balance text-white">
        <PrismicRichText field={item.text} />
      </div>
    </div>
  );
}

/**
 * Determines the Tailwind CSS grid column/row span classes for a BentoBox item.
 *
 * Chooses a predefined grid span based on the item's zero-based `index` to implement the slice's "features-style" layout; if the index is outside the predefined range, falls back to using `item.size` from the CMS.
 *
 * @param item - The BentoBox item object from the CMS; its `size` field (e.g., "Small", "Medium", "Large") is used when no index-specific mapping exists.
 * @param index - Zero-based position of the item within the slice used to select an index-specific layout.
 * @returns A string of Tailwind grid span utility classes (e.g., `"md:col-span-4 md:row-span-2"`) indicating the column and row spans for the item.
 */
function getSpanClass(
  item: Content.BentoBoxSliceDefaultPrimaryItemsItem,
  index: number
) {
  // "features-style" layout by index (matches the right-hand screenshot)
  switch (index) {
    case 0:
      return "md:col-span-4 md:row-span-2"; // big hero (left)
    case 1:
      return "md:col-span-2 md:row-span-2"; // tall knob (right)
    case 2:
      return "md:col-span-3"; // middle-left
    case 3:
      return "md:col-span-3"; // middle-right
    case 4:
      return "md:col-span-2"; // small thumb
    case 5:
      return "md:col-span-4"; // wide bottom
    default:
      // fallback: use item.size from CMS (keeps existing behaviour)
      if (item.size === "Small") return "md:col-span-2";
      if (item.size === "Medium") return "md:col-span-3";
      if (item.size === "Large") return "md:col-span-4";
      return "md:col-span-2";
  }
}