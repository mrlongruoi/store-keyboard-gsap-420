"use client";

import { useRef, useState, createContext, useContext } from "react";
import Link from "next/link";
import { LuChevronRight, LuMenu, LuX } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
} from "@radix-ui/react-dialog";
import { Logo } from "./Logo";
import clsx from "clsx";
import { checkout } from "@/checkout";

const DialogContext = createContext<
  [open: boolean, setOpen: (open: boolean) => void]
>([false, () => {}]);

export function Navbar() {
  const button = useRef<HTMLButtonElement>(null);
  const state = useState(false);
  const [open, setOpen] = state;

  async function handleCheckout() {
    if (button.current) button.current.disabled = true;
    await checkout();
    if (button.current) button.current.disabled = false;
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between p-3 md:p-6">
      <Link
        href="/"
        className="shrink-0 hover:scale-105 motion-safe:transition"
      >
        <Logo className="h-6 w-auto md:h-8" />
      </Link>
      <div className="flex gap-3 md:gap-4">
        <button
          ref={button}
          onClick={handleCheckout}
          className={clsx(
            "group relative flex h-12 transform-gpu cursor-pointer items-center justify-center overflow-hidden rounded bg-gradient-to-r from-[#01A7E1] to-[#0196C9] px-6 py-2.5 font-semibold text-white will-change-transform hover:shadow-lg hover:shadow-[#01A7E1]/25 focus:ring-2 focus:ring-[#01A7E1] focus:ring-offset-2 focus:outline-none disabled:grayscale motion-safe:transition-all motion-safe:duration-300 md:text-base",
            "before:absolute before:inset-0 before:translate-x-[-100%] before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0 before:ease-out hover:before:translate-x-[100%] motion-safe:before:transition-transform motion-safe:before:duration-700",
          )}
        >
          <span className="font-bold-slanted relative z-10 flex items-center gap-2 text-xl uppercase">
            Mua
            <LuChevronRight className="size-5 group-hover:translate-x-0.5 motion-safe:transition-transform motion-safe:duration-200" />
          </span>
        </button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="flex size-12 cursor-pointer items-center justify-center rounded bg-gray-300 hover:bg-gray-300/80 hover:shadow-lg hover:shadow-black/10 motion-safe:transition">
            <LuMenu className="size-5" />
            <span className="sr-only">Chuyển đổi menu</span>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay className="motion-safe:data-[state=open]:animate-in motion-safe:data-[state=closed]:animate-out motion-safe:data-[state=closed]:fade-out-0 motion-safe:data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50" />
            <DialogContent className="motion-safe:data-[state=open]:animate-in motion-safe:data-[state=closed]:animate-out motion-safe:data-[state=closed]:slide-out-to-right motion-safe:data-[state=open]:slide-in-from-right fixed inset-y-0 right-0 z-50 h-full w-3/4 bg-white p-4 shadow-lg ease-in-out motion-safe:transition motion-safe:data-[state=closed]:duration-300 motion-safe:data-[state=open]:duration-500 sm:max-w-sm">
              <DialogTitle className="sr-only" />
              <DialogDescription className="sr-only" />
              <DialogClose className="ml-auto flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-400 hover:text-black motion-safe:transition">
                <LuX className="size-5" />
                <span className="sr-only">Đóng menu</span>
              </DialogClose>
              <DialogContext.Provider value={state}>
                <nav>
                  <ul>
                    <NavbarLink
                      href="#features"
                      title="Đặc trưng"
                      description="Tìm hiểu thêm về các tính năng của chúng tôi"
                    />
                    <NavbarLink
                      href="#switch-playground"
                      title="Bảng điều khiển Switch"
                      description="Chọn switch hoàn hảo cho bạn"
                    />
                    <NavbarLink
                      href="#keycap-changer"
                      title="Keycaps"
                      description="Chọn bộ keycap hoàn hảo cho bạn"
                    />
                    <NavbarLink
                      href="#buy-button"
                      title="Mua"
                      description="Đặt hàng Vapor75 của bạn ngay bây giờ!"
                    />
                  </ul>
                </nav>
              </DialogContext.Provider>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    </header>
  );
}

type NavbarLinkProps = {
  href: string;
  title: string;
  description: string;
};

function NavbarLink({ href, title, description }: NavbarLinkProps) {
  const [, setOpen] = useContext(DialogContext);

  return (
    <li>
      <Link
        href={href}
        onClick={() => setOpen(false)}
        className="group flex items-center rounded-xl p-4 hover:bg-[#01A7E1]/10 motion-safe:transition"
      >
        <div className="flex grow flex-col gap-1">
          <span className="text-xl font-semibold text-gray-900 group-hover:text-[#01A7E1] motion-safe:transition">
            {title}
          </span>
          <span className="text-sm text-gray-500">{description}</span>
        </div>
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400 group-hover:bg-[#01A7E1] group-hover:text-white motion-safe:transition">
          <LuChevronRight className="size-5 translate-x-px" />
        </div>
      </Link>
    </li>
  );
}