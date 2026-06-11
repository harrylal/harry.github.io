import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Harry Lal — Senior Research Engineer @ Novus Hi-Tech",
  description:
    "Harry Lal — Senior Research Engineer at Novus Hi-Tech specializing in robot perception, computer vision, ADAS, and robotics. Building intelligent machines that perceive and act safely in the real world.",
  authors: [{ name: "Harry Lal" }],
  keywords: [
    "Harry Lal",
    "Research Engineer",
    "Computer Vision",
    "ADAS",
    "Robotics",
    "Robot Perception",
    "Reinforcement Learning",
    "Edge AI",
    "Novus Hi-Tech",
  ],
  openGraph: {
    title: "Harry Lal — Senior Research Engineer @ Novus Hi-Tech",
    description:
      "Robot perception, computer vision, and ADAS — building autonomy that protects lives.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="bg-canvas text-ink antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
