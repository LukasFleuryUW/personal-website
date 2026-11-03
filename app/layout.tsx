import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Aurora from "@/components/Aurora";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lukas Fleury | Mechanical Engineering",
  description:
    "Mechanical Engineering student at the University of Waterloo. I design, build, and automate — robotic arms, drones, and whatever's on the bench next.",
  metadataBase: new URL("https://lukasfleury.com"),
  openGraph: {
    type: "website",
    url: "https://lukasfleury.com",
    title: "Lukas Fleury | Mechanical Engineering",
    description:
      "Mechanical Engineering student at the University of Waterloo. I design, build, and automate — robotic arms, drones, and whatever's on the bench next.",
    siteName: "Lukas Fleury",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lukas Fleury — Mechanical Engineering portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lukas Fleury | Mechanical Engineering",
    description:
      "I design, build, and automate — robotic arms, drones, and whatever's on the bench next.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${display.variable} ${mono.variable}`}
    >
      <body className="grain font-sans">
        <Aurora />
        <div className="stack">
          <Nav />
          <main className="mx-auto max-w-6xl px-6 pt-8 pb-24 md:pt-16">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
