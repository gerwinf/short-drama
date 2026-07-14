import Image from "next/image";
import Track from "./track";
import SignupForm from "./signup-form";
import ClipGallery from "./clip-gallery";

const FEATURES = [
  {
    tag: "⭐ PINAKA-VIRAL",
    img: "/shots/04-share-card-ikaw-ang-bida.jpg",
    title: "Ikaw ang Bida",
    headline: "I-share ang cliffhanger. Patulan ng buong FYP.",
    body: "Bawat malaking eksena, may auto-made na share clip: “Ako, sinampal ko siya — ikaw, anong gagawin mo?” I-post sa TikTok o Reels at hayaang mag-debate ang buong barkada. Ito ang share na hindi mo mabibili — kusang kumakalat.",
  },
  {
    tag: "Interactive",
    img: "/shots/03-decision-sagot-mo.jpg",
    title: "Sagot Mo",
    headline: "Ikaw ang magdedesisyon kung anong susunod.",
    body: "Sa gitna ng kabog-dibdib na eksena, ikaw ang pipili: patawarin ba o lumakad na? May timer, may tensyon. Iba’t ibang pinili, iba’t ibang kwento — walang panonood na pareho.",
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
    body: "Real-time na meter na pumipatak sa bawat kilig na eksena. Pag sumabog sa max, alam mo na — grabe ’yon. Screenshot-worthy, screen-record-worthy.",
  },
];

const VIBE_CLIPS = [
  { slug: "rich-boy", label: "Rich Boy Next Door" },
  { slug: "amnesia", label: "Amnesia Twist" },
  { slug: "enemies", label: "Enemies-to-Lovers" },
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
            🎬 Bagong app · Para sa Pinoy
          </span>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] text-cream md:text-6xl">
            Ikaw ang <span className="kilig-glow-text">bida</span> sa sariling
            teleserye.
          </h1>
          <p className="mt-5 max-w-md text-lg text-fog">
            Interactive na short dramas na Pinoy na Pinoy — teleserye ×
            telenovela × K-drama. Ikaw ang pipili ng mangyayari. Ikaw ang
            kikilig.
          </p>
          <div className="mt-8">
            <Cta>Get early access — libre 💖</Cta>
          </div>
          <p className="mt-4 text-sm text-fog/80">
            ⚡ 30 seconds lang · Walang bayad · Mauuna ka sa launch
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
          Sumali sa early access list at maging una sa unang batch ng Kilig.
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
        <p className="mt-4 text-xs text-fog/60">
          © 2026 Kilig. Kokolektahin lang namin ang email at sagot mo para sa
          early access — walang spam, puwedeng mag-opt out anytime.
        </p>
      </footer>
    </main>
  );
}
