import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = { title: "Return Policy" };

export default function ReturnsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container max-w-2xl">
        <SectionHeading eyebrow="Changed your mind?" title="Return Policy" />
        <div className="mt-12 space-y-6 text-sm leading-relaxed text-charcoal/70">
          <p>
            We accept returns within 7 days of delivery on unused items in
            their original packaging. To start a return, contact us with your
            order ID and we'll share the next steps.
          </p>
          <p>
            Earrings and other pierced jewelry cannot be returned for
            hygiene reasons unless the item arrived damaged or defective.
          </p>
          <p>
            Once your return is received and inspected, refunds are issued
            to your original payment method within 5-7 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
