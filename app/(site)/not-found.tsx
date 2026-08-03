import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-6xl text-gold-dark">404</p>
      <h1 className="mt-4 font-display text-2xl">This page has wandered off</h1>
      <p className="mt-2 max-w-sm text-sm text-charcoal/60">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
