import "./globals.css";
import { Inter, Orbitron } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RichSyntax",
  description:
    "The portfolio of Richard — ACCA-certified economist & full-stack developer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${orbitron.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-primary text-text font-sans"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
