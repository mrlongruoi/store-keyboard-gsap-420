import { ReactNode } from "react";
import clsx from "clsx";

type BoundedProps = {
  as?: "section" | "footer";
  fullWidth?: boolean;
  className?: string;
  innerClassName?: string;
  children?: ReactNode;
};

/**
 * Renders a constrained content wrapper that can switch its outer element and optionally span full width.
 *
 * @param as - Element type to render for the outer wrapper (commonly `"section"` or `"footer"`); defaults to `"section"`.
 * @param fullWidth - When `true`, the inner container does not constrain width; when `false`, it limits content to a centered max width.
 * @param className - Additional class names applied to the outer wrapper.
 * @param innerClassName - Additional class names applied to the inner content container.
 * @param children - Content to render inside the inner container.
 * @returns A JSX element containing the outer wrapper and an inner centered container that holds `children`.
 */
export function Bounded({
  as: Comp = "section",
  fullWidth = false,
  className,
  innerClassName,
  children,
}: BoundedProps) {
  return (
    <Comp
      className={clsx(
        "px-6 py-10 md:py-20 [.header+&]:pt-44 [.header+&]:md:pt-32",
        className,
      )}
    >
      <div
        className={clsx(
          "mx-auto w-full",
          !fullWidth && "max-w-7xl",
          innerClassName,
        )}
      >
        {children}
      </div>
    </Comp>
  );
}