import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "HIWI — Wired to build what's next",
  description:
    "HIWI is a digital studio helping businesses build a strong online presence and create the digital foundations they need to grow.",
  icons: {
    icon: "/assets/icon.svg",
  },
};

import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "HIWI",
              slogan: "Wired to build what's next.",
              description:
                "HIWI is a digital studio helping businesses build a strong online presence and create the digital foundations they need to grow.",
              founder: { "@type": "Person", name: "Harsh" },
              email: "harshvr24@gmail.com",
            }),
          }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}>
        <SmoothScroll>
          <CustomCursor />
          <SpeedInsights />
          <Analytics />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
