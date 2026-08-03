"use client";

import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/profile";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkEmail, setCheckEmail] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();

    try {
      if (mode === "register") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
            emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${redirectTo}`,
          },
        });
        if (signUpError) throw signUpError;

        if (data.session) {
          router.push(redirectTo);
          router.refresh();
        } else {
          setCheckEmail(true);
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        router.push(redirectTo);
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checkEmail) {
    return (
      <div className="mt-8 border border-gold/40 bg-sand p-6 text-center">
        <p className="font-display text-lg">Check your inbox</p>
        <p className="mt-2 text-sm text-charcoal/60">
          We sent a confirmation link to {email}. Confirm your email to finish
          creating your account.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      {mode === "register" && (
        <label className="block">
          <span className="text-xs uppercase tracking-widest2 text-charcoal/50">Full name</span>
          <input
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1.5 w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-gold"
          />
        </label>
      )}
      <label className="block">
        <span className="text-xs uppercase tracking-widest2 text-charcoal/50">Email</span>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-gold"
        />
      </label>
      <label className="block">
        <span className="text-xs uppercase tracking-widest2 text-charcoal/50">Password</span>
        <input
          required
          type="password"
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-gold"
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Please wait…" : mode === "login" ? "Log In" : "Create Account"}
      </Button>
    </form>
  );
}
