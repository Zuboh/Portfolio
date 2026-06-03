import type { Metadata } from "next";
import { DM_Mono, Hanken_Grotesk } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { DynamicFavicon } from "@/components/DynamicFavicon";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

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
  title: "zubo.dev",
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  description:
    "Portfolio of a frontend & AI engineer based in Brescia, Italy. Building interfaces and AI-powered tools with React, TypeScript, and Claude API.",
  openGraph: {
    title: "zubo.devFrontend & AI Engineer",
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
      <body className={`${hankenGrotesk.variable} ${dmMono.variable}`} suppressHydrationWarning>
        <ScrollProgress className="from-acc via-acc to-acc h-[1px] z-[200]" />
        <Providers>
          <DynamicFavicon />
          {children}
        </Providers>
      </body>
    </html>
  );
}
