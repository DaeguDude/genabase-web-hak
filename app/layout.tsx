import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import "@shopify/polaris/build/esm/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Genabase",
  description: "Your AI-powered eCommerce Database",
};

// TODO: Shopify sets height: 100%, minHeight: 100% on html, body.
// Might need to come up with better approach(250827, sh)
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: "100%", minHeight: "100%" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ height: "100%", minHeight: "100%" }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
