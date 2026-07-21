import Image from "next/image";
import Track from "./track";
import SignupForm from "./signup-form";
import ClipGallery from "./clip-gallery";
import Link from "next/link";

const FEATURES = [
  {
    tag: "⭐ PINAKA-VIRAL",
    img: "/shots/04-share-card-ikaw-ang-bida.jpg",
    title: "Ikaw ang Bida",
    headline: "I-share ang cliffhanger. Patulan ng buong FYP.",
    body: "Bawat malaking eksena, may ready-to-share na clip: “Ako, sinampal ko siya — ikaw, anong gagawin mo?” I-post sa TikTok o Reels at hayaang mag-debate ang buong barkada. Ito ang share na hindi mo mabibili — kusang kumakalat.",
  },
  {
    tag: "Interactive",
    img: "/shots/03-decision-sagot-mo.jpg",
    title: "Sagot Mo",
    headline: "Ikaw ang magdedesisyon kung anong susunod.",
    body: "Sa gitna ng kabog-dibdib na eksena, ikaw ang pipili: patawarin ba o lumakad na? May timer, may tensyon. Iba’t ibang pinili, iba’t ibang kwento — walang dalawang parehong panonood.",
  },
  {
    tag: "Fandom",
    img: "/shots/09-team-voting.jpg",
    title: "Team [Bida]",
    headline: "Piliin ang ship mo. I-defend sa comments.",
    body: "Team Mateo o Team Sung? Iboto ang OTP mo, panoorin ang live leaderboard, at makipag-away nang masaya para sa ship mo. Fandom war, on tap.",
  },
  {
    tag: "FOMO",
    img: "/shots/10-the-other-path.jpg",
    title: "The Other Path",
    headline: "Isang kwento, sangkatutak na ending.",
    body: "Nakita mo na ’yung happy ending? May ibang landas pang naghihintay sa likod ng lock. Balikan. Ulitin. Kiligin ulit — hanggang makita mo lahat.",
  },
  {
    tag: "Signature",
    img: "/shots/02-player-kilig-meter.jpg",
    title: "Kilig Meter",
    headline: "Feel every giddy moment.",
    body: "Real-time na meter na pumipatak sa bawat kilig na eksena. Pag umabot sa max, alam mo na — grabe ’yon. Screenshot-worthy, screen-record-worthy.",
  },
];

// Premises with a playable episode get playHref — those tiles open the real
// interactive player; the rest still open the teaser lightbox.
const VIBE_CLIPS = [
  { slug: "rich-boy", label: "Rich Boy Next Door", playHref: "/play/rich-boy" },
  { slug: "amnesia", label: "Amnesia Twist" },
  { slug: "enemies", label: "Enemies-to-Lovers", playHref: "/play/enemies" },
  { slug: "cinderella", label: "Cinderella Teleserye" },
];

const APP_CLIPS = [
  { slug: "app-onboarding", label: "Pumili ng kilig" },
  { slug: "app-feed", label: "Ang home feed" },
  { slug: "app-series", label: "Series + Team vote" },
];

function PhoneShot({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={340}
      height={601}
      priority={priority}
      sizes="(max-width: 640px) 70vw, 340px"
      className="phone-shadow h-auto w-full rounded-[1.6rem]"
    />
  );
}

function Cta({ children }: { children: React.ReactNode }) {
  return (
    <button
      data-kilig-open
      className="kilig-cta-shadow inline-flex items-center gap-2 rounded-full bg-rose px-8 py-4 text-lg font-semibold text-white transition active:scale-[0.98]"
    >
      {children}
    </button>
  );
}

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Track />
      <SignupForm />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,61,104,0.22),transparent_70%)]" />

      {/* Header */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <span className="font-display text-2xl font-semibold text-rose">
          kilig
        </span>
        <button
          data-kilig-open
          className="rounded-full border border-rose/50 px-5 py-2 text-sm font-semibold text-cream transition hover:bg-rose/10"
        >
          Early access
        </button>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-5 pb-8 pt-6 md:grid-cols-2 md:pt-14">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-plum-700 bg-plum-800/60 px-4 py-1.5 text-sm text-gold">
            🎬 Bagong app · Para sa mga Pinoy
          </span>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] text-cream md:text-6xl">
            Ikaw ang <span className="kilig-glow-text">bida</span> sa sariling
            teleserye.
          </h1>
          <p className="mt-5 max-w-md text-lg text-fog">
            Interactive short dramas na totoong Pinoy — teleserye ×
            telenovela × K-drama. Ikaw ang pipili ng mangyayari. Promise,
            kikiligin ka.
          </p>
          <div className="mt-8">
            <Cta>Get early access — libre 💖</Cta>
          </div>
          <p className="mt-4 text-sm text-fog/80">
            ⚡ 30 seconds lang · Libre · Mauna sa launch
          </p>
        </div>

        <div className="relative mx-auto flex w-full max-w-sm justify-center">
          <div className="absolute -left-2 top-10 w-1/2 rotate-[-8deg] opacity-80">
            <PhoneShot
              src="/shots/01-onboarding-choose-your-kilig.jpg"
              alt="Choose your first kilig onboarding screen"
            />
          </div>
          <div className="relative z-10 w-3/4 animate-floaty md:w-4/5">
            <PhoneShot
              src="/shots/04-share-card-ikaw-ang-bida.jpg"
              alt="Ikaw ang Bida share card"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-semibold text-cream md:text-5xl">
            Hindi mo pa ito nakita sa ibang app.
          </h2>
          <p className="mt-4 text-fog">
            Habang panood ka lang nang panood sa ibang short-drama app, dito —
            ikaw ang gumagalaw ng kwento.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-16 md:gap-24">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`grid items-center gap-8 md:grid-cols-2 ${
                i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="mx-auto w-3/5 max-w-[300px] md:w-full">
                <PhoneShot src={f.img} alt={`${f.title} screen`} />
              </div>
              <div>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${
                    f.tag.includes("VIRAL")
                      ? "kilig-glow-bg text-plum"
                      : "border border-plum-700 text-gold"
                  }`}
                >
                  {f.tag}
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-rose">
                  {f.title}
                </h3>
                <p className="mt-1 font-display text-2xl font-semibold text-cream">
                  {f.headline}
                </p>
                <p className="mt-3 max-w-md text-fog">{f.body}</p>
                {f.title === "Sagot Mo" && (
                  <Link
                    href="/play"
                    data-play-cta
                    className="kilig-glow-bg kilig-cta-shadow mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-plum transition active:scale-[0.98]"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                      <path d="M4 2.5v11l9-5.5-9-5.5z" />
                    </svg>
                    Laruin ang isang eksena — libre
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vibes gallery */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 py-16">
        <div className="rounded-3xl border border-plum-700 bg-plum-800/40 p-8 md:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold text-cream md:text-4xl">
              Choose your first kilig
            </h2>
            <p className="mt-3 text-fog">
              Anong type mong kilig? Pindutin para sa lasa ng bawat kwento. 👇
            </p>
          </div>
          <div className="mt-8 md:mx-auto md:max-w-3xl">
            <ClipGallery items={VIBE_CLIPS} layout="grid" />
          </div>
        </div>
      </section>

      {/* App in motion */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 pb-4 pt-2 md:pb-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-cream md:text-4xl">
            Tingnan ang app sa aksyon
          </h2>
          <p className="mt-3 text-fog">
            Hindi lang cinematic — buhay na buhay ang app. Pindutin para makita. 👇
          </p>
        </div>
        <div className="mt-8 md:mx-auto md:max-w-3xl">
          <ClipGallery items={APP_CLIPS} layout="carousel" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 mx-auto max-w-3xl px-5 py-20 text-center">
        <h2 className="font-display text-4xl font-semibold text-cream md:text-5xl">
          Handa ka nang <span className="kilig-glow-text">kiligin</span>?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-fog">
          Kunin mo na ang early access at maging kasama sa pioneer batch ng Kilig.
          Libre — 30 seconds lang.
        </p>
        <div className="mt-8">
          <Cta>Sali na ako 💖</Cta>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-plum-800 px-5 py-10 text-center">
        <p className="font-display text-xl font-semibold text-rose">kilig</p>
        <p className="mt-2 text-sm text-fog">Ikaw ang bida sa sariling teleserye.</p>
        <div className="mt-5 flex items-center justify-center">
          <a
            href="https://www.facebook.com/1222004864328121"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Sundan ang Kilig sa Facebook"
            className="grid h-10 w-10 place-items-center rounded-full border border-plum-700 text-fog transition hover:border-rose hover:text-rose"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073c0 6.026 4.388 11.02 10.125 11.927v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796v8.437C19.612 23.094 24 18.099 24 12.073z" />
            </svg>
          </a>
        </div>
        <p className="mt-5 text-xs text-fog/60">
          © 2026 Kilig. Kokolektahin lang namin ang email at sagot mo para sa
          early access — walang spam, puwedeng mag-opt out anytime.
        </p>
      </footer>
    </main>
  );
}
