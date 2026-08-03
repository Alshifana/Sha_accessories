import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = { title: "Shipping Info" };

export default function ShippingPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container max-w-2xl">
        <SectionHeading eyebrow="Delivery details" title="Shipping Info" />
        <div className="mt-12 space-y-6 text-sm leading-relaxed text-charcoal/70">
          <p>
            Orders are processed within 1-2 business days. Standard shipping
            takes 5-7 business days across India; Express shipping takes 2-3
            business days for an additional fee shown at checkout.
          </p>
          <p>
            Orders above ₹1,999 qualify for free standard shipping. Every
            package is insured and tracked — you'll receive a tracking link
            by email once your order ships.
          </p>
          <p>
            Use the delivery checker on any product page to estimate arrival
            time for your pincode before you buy.
          </p>
        </div>
      </div>
    </div>
  );
}
