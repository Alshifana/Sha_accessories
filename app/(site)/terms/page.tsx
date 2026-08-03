import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container max-w-2xl">
        <SectionHeading eyebrow="The fine print" title="Terms & Conditions" />
        <div className="mt-12 space-y-6 text-sm leading-relaxed text-charcoal/70">
          <p>
            By placing an order with Sha-Accessories, you agree to provide
            accurate shipping and contact information and to use the site
            for personal, non-commercial purchases.
          </p>
          <p>
            Product images are representative — due to the handcrafted
            nature of each piece, slight variations in grain, tone or finish
            should be expected and are not considered defects.
          </p>
          <p>
            Prices are listed in Indian Rupees and may change without prior
            notice. Orders already placed will honor the price at checkout.
          </p>
        </div>
      </div>
    </div>
  );
}
