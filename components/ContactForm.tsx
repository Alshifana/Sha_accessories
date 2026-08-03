"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border border-gold/40 bg-sand p-8 text-center">
        <p className="font-display text-xl">Message sent</p>
        <p className="mt-2 text-sm text-charcoal/60">
          Thanks for reaching out — we typically reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs uppercase tracking-widest2 text-charcoal/50">Name</span>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1.5 w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-gold"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-widest2 text-charcoal/50">Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1.5 w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-gold"
          />
        </label>
      </div>
      <label className="block">
        <span className="text-xs uppercase tracking-widest2 text-charcoal/50">Subject</span>
        <input
          required
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="mt-1.5 w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-gold"
        />
      </label>
      <label className="block">
        <span className="text-xs uppercase tracking-widest2 text-charcoal/50">Message</span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="mt-1.5 w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-gold"
        />
      </label>
      <Button type="submit">Send Message</Button>
    </form>
  );
}
