import { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Bounded } from "./Bounded";

/**
 * Renders the site's footer bar with branding, a dynamic current-year copyright,
 * and primary site navigation links.
 *
 * @returns A footer element containing the brand/logo area, the current year text, and navigation links.
 */
export function Footer() {
  return (
    <Bounded as="footer" className="bg-black text-gray-400">
      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="shrink-0">
            <Logo className="h-8 w-auto" />
            <span className="sr-only">Trang chủ Store</span>
          </Link>
          <p className="mt-4 text-center text-sm md:text-left">
            © {new Date().getFullYear()} Store Keyboards. Tất cả quyền được bảo lưu.
          </p>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:justify-end">
          <FooterLink href="/products">Các sản phẩm</FooterLink>
          <FooterLink href="/about">Về chúng tôi</FooterLink>
          <FooterLink href="/support">Hỗ trợ</FooterLink>
          <FooterLink href="/contact">Liên hệ</FooterLink>
        </nav>
      </div>
    </Bounded>
  );
}

type FooterLinkProps = {
  href: string;
  children: ReactNode;
};

/**
 * Renders a styled internal navigation link for the footer.
 *
 * @param href - Destination URL or path for the link
 * @param children - Visible content rendered inside the link
 * @returns A Next.js `Link` element styled for footer typography and focus/hover states
 */
function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <Link
      href={href}
      className="text-sm transition-colors hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
    >
      {children}
    </Link>
  );
}