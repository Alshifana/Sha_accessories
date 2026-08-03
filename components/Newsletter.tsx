"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="bg-beige py-20">
      <div className="container">
        <FadeIn className="mx-auto max-w-xl text-center">
          <p className="eyebrow">Stay in touch</p>
          <h2 className="mt-3 font-display text-3xl text-charcoal">
            Get 10% off your first order
          </h2>
          <p className="mt-3 text-sm text-charcoal/60">
            New arrivals, restocks and styling notes — no spam, unsubscribe
            anytime.
          </p>
          {submitted ? (
            <p className="mt-6 text-sm text-gold-dark">
              You're on the list — check your inbox for your code.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full border border-charcoal/20 bg-ivory px-5 py-3.5 text-sm placeholder:text-charcoal/40 focus:outline-none focus:border-gold sm:w-72"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
