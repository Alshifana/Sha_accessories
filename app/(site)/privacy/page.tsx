import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container max-w-2xl">
        <SectionHeading eyebrow="Your data, respected" title="Privacy Policy" />
        <div className="mt-12 space-y-6 text-sm leading-relaxed text-charcoal/70">
          <p>
            We collect only the information needed to process your orders —
            name, shipping address, contact details and payment confirmation.
            We never sell your personal data to third parties.
          </p>
          <p>
            Cart and wishlist data are stored locally in your browser unless
            you're signed in, in which case they sync to your account so you
            can pick up where you left off on another device.
          </p>
          <p>
            You can request a copy of your data or ask us to delete your
            account at any time by contacting hello@sha-accessories.example.
          </p>
        </div>
      </div>
    </div>
  );
}
