"use client";

import { useState, FormEvent } from "react";
import { Truck, CheckCircle2 } from "lucide-react";

export function DeliveryChecker() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState<null | { eta: string }>(null);

  const handleCheck = (e: FormEvent) => {
    e.preventDefault();
    if (pincode.length !== 6) return;
    // Simulated ETA — in production this calls a shipping API.
    const days = 3 + (parseInt(pincode[0], 10) % 4);
    setResult({ eta: `${days}-${days + 2} business days` });
  };

  return (
    <div className="border border-border p-4">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Truck size={16} className="text-gold-dark" /> Check delivery
      </div>
      <form onSubmit={handleCheck} className="mt-3 flex gap-2">
        <input
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="Enter pincode"
          className="w-full border border-border px-3 py-2 text-sm focus:outline-none focus:border-gold"
        />
        <button
          type="submit"
          className="shrink-0 bg-charcoal px-4 text-xs uppercase tracking-widest2 text-ivory hover:bg-gold-dark"
        >
          Check
        </button>
      </form>
      {result && (
        <p className="mt-3 flex items-center gap-1.5 text-xs text-gold-dark">
          <CheckCircle2 size={14} /> Delivers in {result.eta}
        </p>
      )}
    </div>
  );
}
