import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import MetaPixel from "./meta-pixel";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kilig — Ikaw ang bida sa sariling teleserye",
  description:
    "Interactive Filipino short dramas. Teleserye × telenovela × K-drama. You make the choices, you get the kilig. Join the early access list.",
  openGraph: {
    title: "Kilig — Ikaw ang bida sa sariling teleserye",
    description:
      "Interactive Filipino short dramas where YOU decide the story. Join early access.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
