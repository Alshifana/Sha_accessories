import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { FaqAccordion } from "@/components/FaqAccordion";

export const metadata: Metadata = { title: "FAQ" };

const faqs = [
  { q: "Is the jewelry really anti-tarnish?", a: "Yes — every piece is plated in 18k gold over brass and sealed with a protective coating designed to resist everyday moisture, sweat and air exposure. It's not permanent forever, but it significantly outlasts standard plating." },
  { q: "How do I care for my photo frame?", a: "Wipe with a dry, soft cloth. Avoid direct sunlight for long periods and don't use household glass cleaner directly on wood or brass finishes." },
  { q: "Can I customize a frame size?", a: "Select frames support multiple photo sizes shown on the product page. For fully custom sizing, reach out via our Contact page." },
  { q: "What is your return window?", a: "We accept returns within 7 days of delivery for unused items in original packaging. See our Return Policy for full details." },
  { q: "Do you ship internationally?", a: "Currently we ship within India. International shipping is on our roadmap — sign up to our newsletter for updates." },
];

export default function FaqPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container max-w-2xl">
        <SectionHeading eyebrow="Common questions" title="FAQ" />
        <div className="mt-12">
          <FaqAccordion items={faqs} />
        </div>
      </div>
    </div>
  );
}
