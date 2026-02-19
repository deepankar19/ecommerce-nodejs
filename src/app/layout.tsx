import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastProvider } from "@/context/ToastContext";
import { RecentlyViewedProvider } from "@/context/RecentlyViewedContext";
import ToastContainer from "@/components/ToastContainer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopVerse - Premium E-Commerce Store",
  description:
    "Discover amazing products at great prices. Shop electronics, fashion, home goods, and more at ShopVerse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <RecentlyViewedProvider>
                <Header />
                <main className="min-h-screen">{children}</main>
                <Footer />
                <ToastContainer />
              </RecentlyViewedProvider>
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
