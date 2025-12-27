import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Scene } from "@/components/three/Scene";
import { ConsentToggle } from "@/components/analytics/ConsentToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mood-mirror.example"),
  title: "Mood Mirror",
  description:
    "3D Personality app scaffolded for the Mood Mirror MVP (Next.js 16).",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Mood Mirror | 3D Personality App",
    description: "女子向けに最適化した診断MVPのベースプロジェクト",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 1200,
        alt: "Mood Mirror app icon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mood Mirror | 3D Personality App",
    description: "女子向けに最適化した診断MVPのベースプロジェクト",
    images: [
      {
        url: "/twitter-image.png",
        width: 1200,
        height: 1200,
        alt: "Mood Mirror app icon",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className="bg-slate-950 text-slate-50"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-[#060815] via-[#050712] to-[#04060d] text-slate-50`}
        suppressHydrationWarning
      >
        <div className="relative mx-auto min-h-screen w-full max-w-5xl px-4 py-8 sm:px-10 sm:py-10">
          <Scene />
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex justify-end">
              <ConsentToggle />
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
