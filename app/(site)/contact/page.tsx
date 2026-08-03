import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Sha-Accessories for order queries, custom requests, or general questions.",
};

const details = [
  { icon: Mail, label: "Email", value: "hello@sha-accessories.example" },
  { icon: Phone, label: "Phone", value: "+91 00000 00000" },
  { icon: MapPin, label: "Studio", value: "Madurai, Tamil Nadu, India" },
  { icon: Clock, label: "Hours", value: "Mon–Sat, 10am–6pm IST" },
];

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container">
        <SectionHeading eyebrow="We'd love to hear from you" title="Get in Touch" />

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <ul className="space-y-6">
              {details.map((d) => (
                <li key={d.label} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/40">
                    <d.icon size={18} className="text-gold-dark" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest2 text-charcoal/45">{d.label}</p>
                    <p className="mt-1 text-sm text-charcoal">{d.value}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  );
}
