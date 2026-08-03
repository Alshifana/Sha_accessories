import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = { title: "Log In" };

export default function LoginPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container flex justify-center">
        <div className="w-full max-w-sm">
          <div className="text-center">
            <p className="eyebrow">Welcome back</p>
            <h1 className="mt-3 font-display text-3xl">Log In</h1>
          </div>
          <Suspense fallback={null}>
            <AuthForm mode="login" />
          </Suspense>
          <p className="mt-6 text-center text-sm text-charcoal/60">
            New here?{" "}
            <Link href="/register" className="text-gold-dark hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
