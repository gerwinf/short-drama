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
  metadataBase: new URL("https://kilig.nueve.club"),
  applicationName: "Kilig",
  title: "Kilig — Ikaw ang bida sa sariling teleserye",
  description:
    "Interactive Filipino short dramas — teleserye × telenovela × K-drama. Ikaw ang pipili ng mangyayari. Ikaw ang kikilig. Join the early access list.",
  keywords: [
    "Kilig",
    "Filipino short drama",
    "interactive drama",
    "teleserye",
    "telenovela",
    "K-drama",
    "Pinoy",
  ],
  openGraph: {
    title: "Kilig — Ikaw ang bida sa sariling teleserye",
    description:
      "Interactive Filipino short dramas where YOU decide the story. Teleserye × telenovela × K-drama. Join early access.",
    url: "https://kilig.nueve.club",
    siteName: "Kilig",
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kilig — Ikaw ang bida sa sariling teleserye",
    description:
      "Interactive Filipino short dramas where YOU decide the story. Join early access.",
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
