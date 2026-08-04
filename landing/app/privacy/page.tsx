import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Kilig",
  description:
    "How Kilig collects, uses, and protects your data — including signup answers, email, analytics, and the Meta Pixel — and how to request deletion.",
  alternates: { canonical: "/privacy" },
};

const EFFECTIVE_DATE = "August 4, 2026";
const CONTACT_EMAIL = "hello@kilig.nueve.club";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-semibold text-cream">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-fog">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-14">
      <Link
        href="/"
        className="text-sm text-fog transition hover:text-rose"
      >
        ← Back to Kilig
      </Link>

      <h1 className="mt-6 font-display text-3xl font-semibold text-cream">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-fog/80">Effective {EFFECTIVE_DATE}</p>

      <p className="mt-6 text-sm leading-relaxed text-fog">
        Kilig (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is an interactive Filipino
        short-drama project. This page explains what data we collect on{" "}
        <span className="text-cream">kilig.nueve.club</span> and through our ads,
        how we use it, who we share it with, and how you can have it deleted.
        Short version: kokolektahin lang namin ang sagot at email mo para sa
        early access — walang spam, walang pagbebenta ng data, puwedeng
        mag-opt-out anytime.
      </p>

      <Section title="1. What we collect">
        <p>
          <span className="text-cream">Information you give us:</span> your
          answers in the early-access signup (drama preferences, watching
          frequency, general location such as &ldquo;Philippines&rdquo; or
          &ldquo;abroad&rdquo;, gender, and age range) and your email address.
        </p>
        <p>
          <span className="text-cream">Information collected automatically:</span>{" "}
          basic usage events (page view, form opened, signup completed), a
          random session identifier, the referrer and ad-campaign parameters
          (UTM tags) that brought you here, and standard web analytics via
          Vercel Analytics. We do not build browsing profiles beyond this site.
        </p>
      </Section>

      <Section title="2. Meta (Facebook) Pixel and Meta Platform data">
        <p>
          We use the Meta Pixel to measure whether our Facebook ads work. The
          pixel tells Meta that your browser viewed this page or completed a
          signup (a &ldquo;Lead&rdquo; event). Meta processes this under its own{" "}
          <a
            href="https://www.facebook.com/privacy/policy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose underline decoration-rose/40 underline-offset-2 hover:decoration-rose"
          >
            Privacy Policy
          </a>
          , and you can control ad personalization in your{" "}
          <a
            href="https://www.facebook.com/adpreferences/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose underline decoration-rose/40 underline-offset-2 hover:decoration-rose"
          >
            Facebook ad preferences
          </a>
          .
        </p>
        <p>
          Any data we receive from Meta&rsquo;s platform (for example ad
          performance reporting) is used only to run, measure, and improve our
          advertising, in line with the Meta Platform Terms and Developer
          Policies. We do not sell Meta Platform data or use it to build user
          profiles unrelated to Kilig.
        </p>
      </Section>

      <Section title="3. How we use your data">
        <p>
          To keep you on the early-access list and email you about Kilig&rsquo;s
          launch; to understand which stories and features people want (in
          aggregate); and to measure which ads bring in genuine interest. Every
          email we send includes a one-click unsubscribe link.
        </p>
      </Section>

      <Section title="4. Who we share it with">
        <p>
          We never sell your data. We use a small set of service providers to
          run the site: Vercel (hosting and analytics), Resend (email
          delivery), and Meta (ad measurement, as described above). Each
          processes data only on our behalf under their own terms.
        </p>
      </Section>

      <Section title="5. How long we keep it">
        <p>
          Signup data is kept while we validate and build Kilig, and deleted
          when it is no longer needed or when you ask us to delete it —
          whichever comes first. Unsubscribing stops all emails immediately.
        </p>
      </Section>

      <Section title="6. Your rights and data deletion">
        <p>
          You can ask us at any time to access, correct, or delete the data we
          hold about you. This includes rights under the Philippine Data
          Privacy Act of 2012 (RA 10173) and, where it applies, the GDPR.
        </p>
        <p>
          <span className="text-cream">To delete your data:</span> email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Delete%20my%20data`}
            className="text-rose underline decoration-rose/40 underline-offset-2 hover:decoration-rose"
          >
            {CONTACT_EMAIL}
          </a>{" "}
          with the subject &ldquo;Delete my data&rdquo; from the address you
          signed up with. We will delete your signup record and email within 30
          days and confirm when it is done. Clicking unsubscribe in any of our
          emails also removes you from all future mailings.
        </p>
      </Section>

      <Section title="7. Children">
        <p>
          Kilig is not directed at children. Do not sign up if you are under
          18; if we learn we hold a minor&rsquo;s data, we will delete it.
        </p>
      </Section>

      <Section title="8. Changes and contact">
        <p>
          If we change this policy, we will update this page and the effective
          date above. Questions? Email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-rose underline decoration-rose/40 underline-offset-2 hover:decoration-rose"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </Section>

      <p className="mt-12 border-t border-plum-800 pt-6 text-xs text-fog/60">
        © 2026 Kilig · kilig.nueve.club
      </p>
    </main>
  );
}
