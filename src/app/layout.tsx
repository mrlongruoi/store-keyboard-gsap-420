import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth", "slnt", "opsz"],
});

export const metadata: Metadata = {
  title: "Store Keyboards",
  description: "Một bộ sưu tập bàn phím cơ đẹp mắt và chất lượng cao.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoFlex.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}