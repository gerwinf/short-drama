import { redirect } from "next/navigation";
import { DEFAULT_EPISODE } from "./story";

// /play keeps working (the landing CTA points here) by sending viewers to the
// default episode. Individual episodes live at /play/<slug>.
export default function PlayIndex() {
  redirect(`/play/${DEFAULT_EPISODE}`);
}
