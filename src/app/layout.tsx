import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { DynamicFavicon } from "@/components/DynamicFavicon";

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  applicationName: "zubo.dev",
  metadataBase: new URL("https://zubo.dev"),
  title: "zubo.dev — Frontend & AI Engineer",
  description:
    "Portfolio of a frontend & AI engineer based in Brescia, Italy. Building interfaces and AI-powered tools with React, TypeScript, and Claude API.",
  openGraph: {
    title: "zubo.dev — Frontend & AI Engineer",
    description:
      "Portfolio of a frontend & AI engineer based in Brescia, Italy. Building interfaces and AI-powered tools with React, TypeScript, and Claude API.",
    url: "https://zubo.dev",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "zubo.dev — Frontend & AI Engineer",
    description:
      "Portfolio of a frontend & AI engineer based in Brescia, Italy. Building interfaces and AI-powered tools with React, TypeScript, and Claude API.",
  },  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={dmMono.variable} suppressHydrationWarning>
        <Providers>
             <DynamicFavicon />
             {children}
        </Providers>
      </body>
    </html>
  );
}
