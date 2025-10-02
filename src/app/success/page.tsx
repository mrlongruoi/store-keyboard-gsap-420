import type { Metadata } from "next";
import Link from "next/link";
import {
  LuCheck,
  LuChevronRight,
  LuCircleHelp,
  LuMail,
  LuPackageCheck,
  LuPackageOpen,
} from "react-icons/lu";
import Stripe from "stripe";

import { Logo } from "@/components/Logo";
import { FadeIn } from "@/components/FadeIn";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

export const metadata: Metadata = {
  title: "Xác nhận đặt hàng | Store Keyboards",
  description:
    "Cảm ơn bạn đã mua hàng! Đơn hàng của bạn đã được xác nhận và đang được xử lý.",
};

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const resolvedSearchParams = await searchParams;
  const sessionId = resolvedSearchParams.session_id;

  // Handle missing session ID
  if (!sessionId) {
    return (
      <div className="relative mt-20 min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <LuCircleHelp className="h-10 w-10 text-red-600" />
            </div>
            <h1 className="font-bold-slanted mt-8 text-4xl text-gray-900 sm:text-5xl lg:text-6xl">
              <span className="block tracking-tight uppercase">Có vấn đề xảy ra</span>
              <span className="block bg-gradient-to-r from-red-500 to-red-600 bg-clip-text tracking-tight text-transparent uppercase">
                Vui lòng thử lại
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Không tìm thấy ID phiên
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#01A7E1] to-[#0196C9] px-6 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#01A7E1]/25"
            >
              Quay lại trang chủ
              <LuChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Fetch session details from Stripe
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const orderDetails = {
      sessionId: session.id,
      customerEmail: session.customer_details?.email || "",
      amount: session.amount_total
        ? (session.amount_total / 100).toFixed(2)
        : "",
    };

    return (
      <div className="relative mt-20 min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <FadeIn
          targetChildren
          className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8"
        >
          {/* Success Icon and Header */}
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#01A7E1] to-[#0196C9]">
              <LuCheck className="h-10 w-10 text-white" />
            </div>

            <h1 className="font-bold-slanted mt-8 text-4xl text-gray-900 sm:text-5xl lg:text-6xl">
              <span className="block tracking-tight uppercase">Thanh toán</span>
              <span className="block bg-gradient-to-r from-[#01A7E1] to-[#0196C9] bg-clip-text tracking-tight text-transparent uppercase">
                Thành công
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Cảm ơn bạn đã mua hàng của bạn! Đơn đặt hàng của bạn đã được xác nhận và là
              được xử lý.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg shadow-black/5 backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Xác nhận đơn hàng
              </h2>
              <Logo className="h-8 w-auto" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 py-3">
                <span className="text-gray-600">Mã đơn hàng:</span>
                <span className="font-mono text-sm text-gray-900">
                  {orderDetails.sessionId}
                </span>
              </div>

              {orderDetails.customerEmail && (
                <div className="flex items-center justify-between border-b border-gray-100 py-3">
                  <span className="text-gray-600">E-mail:</span>
                  <span className="text-gray-900">
                    {orderDetails.customerEmail}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between border-b border-gray-100 py-3">
                <span className="text-gray-600">Sản phẩm:</span>
                <span className="text-gray-900">Vapor75 Keyboard</span>
              </div>

              {orderDetails.amount && (
                <div className="flex items-center justify-between border-b border-gray-100 py-3">
                  <span className="text-gray-600">Số lượng:</span>
                  <span className="font-semibold text-gray-900">
                    ${orderDetails.amount}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between py-3">
                <span className="text-gray-600">Trạng thái:</span>
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                  <div className="mr-1.5 h-2 w-2 rounded-full bg-green-400" />
                  Đã xác nhận
                </span>
              </div>
            </div>
          </div>

          {/* What's Next Section */}
          <div className="mt-12 text-center">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">
              Điều gì tiếp theo?
            </h3>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <LuMail className="h-6 w-6 text-[#01A7E1]" />
                </div>
                <h4 className="mb-2 font-semibold text-gray-900">
                  Xác nhận đơn hàng
                </h4>
                <p className="text-sm text-gray-600">
                  Bạn sẽ nhận được email xác nhận với thông tin theo dõi trong
                  thời gian ngắn.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <LuPackageOpen className="h-6 w-6 text-[#01A7E1]" />
                </div>
                <h4 className="mb-2 font-semibold text-gray-900">Xử lý</h4>
                <p className="text-sm text-gray-600">
                  Chúng tôi đang chuẩn bị bàn phím của bạn và sẽ giao hàng trong
                  khoảng 2-3 ngày làm việc.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <LuPackageCheck className="h-6 w-6 text-[#01A7E1]" />
                </div>
                <h4 className="mb-2 font-semibold text-gray-900">Vận chuyển</h4>
                <p className="text-sm text-gray-600">
                  Bàn phím của bạn sẽ đến trong khoảng 5-7 ngày làm việc với thông
                  tin theo dõi.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="group relative flex transform-gpu cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[#01A7E1] to-[#0196C9] px-8 py-3 font-semibold text-white transition-all duration-300 will-change-transform hover:shadow-lg hover:shadow-[#01A7E1]/25 focus:ring-2 focus:ring-[#01A7E1] focus:ring-offset-2 focus:outline-none"
            >
              <span className="font-bold-slanted relative z-10 flex items-center gap-2 text-lg uppercase">
                Tiếp tục mua sắm
                <span className="inline-block text-lg transition-transform duration-200 group-hover:translate-x-0.5">
                  <LuChevronRight className="h-5 w-5" />
                </span>
              </span>
            </Link>

            <Link
              href="/"
              className="group flex items-center justify-center rounded-xl border border-gray-300 bg-white px-8 py-3 font-semibold text-gray-700 transition-all duration-300 hover:border-[#01A7E1] hover:bg-gray-50 focus:ring-2 focus:ring-[#01A7E1] focus:ring-offset-2 focus:outline-none"
            >
              <span className="flex items-center gap-2 text-lg">
                <LuCircleHelp className="h-5 w-5" />
                Cần trợ giúp?
              </span>
            </Link>
          </div>
        </FadeIn>
      </div>
    );
  } catch (error) {
    console.error("Lỗi khi truy xuất phiên Stripe:", error);

    return (
      <div className="relative mt-20 min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <LuCircleHelp className="h-10 w-10 text-red-600" />
            </div>
            <h1 className="font-bold-slanted mt-8 text-4xl text-gray-900 sm:text-5xl lg:text-6xl">
              <span className="block tracking-tight uppercase">Có vấn đề xảy ra</span>
              <span className="block bg-gradient-to-r from-red-500 to-red-600 bg-clip-text tracking-tight text-transparent uppercase">
                Vui lòng thử lại
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Không thể tải thông tin đơn hàng
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#01A7E1] to-[#0196C9] px-6 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#01A7E1]/25"
            >
              Quay lại trang chủ
              <LuChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}