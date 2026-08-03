"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden bg-charcoal">
      <Image
        src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1800&auto=format&fit=crop"
        alt="Hand-finished jewelry and photo frames arranged on a table"
        fill
        priority
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-charcoal/40" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.p variants={item} className="eyebrow text-gold-light">
          Handcrafted · Since the smallest details
        </motion.p>
        <motion.h1
          variants={item}
          className="mt-5 max-w-3xl font-display text-4xl leading-[1.1] text-ivory sm:text-6xl lg:text-7xl"
        >
          Frames &amp; Jewelry made to keep
        </motion.h1>
        <motion.p variants={item} className="mt-6 max-w-md text-sm text-ivory/70 sm:text-base">
          Elegant photo frames and anti-tarnish accessories, finished by hand
          and built to hold their shine long after the trend does.
        </motion.p>
        <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" variant="gold">
            <Link href="/shop">
              Shop the collection <ArrowRight size={16} />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-ivory/60 text-ivory hover:bg-ivory hover:text-charcoal"
          >
            <Link href="/category/necklaces">Explore jewelry</Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory/60"
      >
        <div className="h-10 w-px bg-ivory/30 mx-auto mb-2 overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-full bg-gold-light"
          />
        </div>
        <span className="text-[10px] uppercase tracking-widest2">Scroll</span>
      </motion.div>
    </section>
  );
}
