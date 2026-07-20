import type { Metadata } from "next";
import SignupForm from "../signup-form";
import Track from "../track";
import Player from "./player";
import { richBoy } from "./story/rich-boy";

export const metadata: Metadata = {
  title: "Rich Boy Next Door — Ikaw ang bida | Kilig",
  description:
    "Panoorin at piliin ang iyong landas. Isang interactive Pinoy short drama — Sagot mo ang magbabago ng kwento.",
};

export default function PlayPage() {
  return (
    <main className="min-h-[100dvh] bg-plum">
      <Track />
      <Player story={richBoy} />
      {/* Any [data-kilig-open] click (the ending CTA) opens the early-access form. */}
      <SignupForm />
    </main>
  );
}
