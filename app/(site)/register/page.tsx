import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container flex justify-center">
        <div className="w-full max-w-sm">
          <div className="text-center">
            <p className="eyebrow">Join Sha-Accessories</p>
            <h1 className="mt-3 font-display text-3xl">Create Account</h1>
          </div>
          <Suspense fallback={null}>
            <AuthForm mode="register" />
          </Suspense>
          <p className="mt-6 text-center text-sm text-charcoal/60">
            Already have an account?{" "}
            <Link href="/login" className="text-gold-dark hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
