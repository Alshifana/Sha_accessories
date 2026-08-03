"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

type OrderInfo = { orderId: string; total: number; items: number };

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<OrderInfo | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("aurelie_last_order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {}
  }, []);

  return (
    <div className="pt-40 pb-24">
      <div className="container flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
        >
          <CheckCircle2 size={64} className="text-gold-dark" strokeWidth={1.2} />
        </motion.div>
        <h1 className="mt-6 font-display text-3xl sm:text-4xl">Order Confirmed</h1>
        <p className="mt-3 max-w-md text-sm text-charcoal/60">
          Thank you — your order is being prepared with care. You can complete
          checkout as a guest or with an account.
        </p>

        {order && (
          <div className="mt-8 flex items-center gap-3 border border-border px-6 py-4 text-sm">
            <Package size={18} className="text-gold-dark" />
            <div className="text-left">
              <p className="text-charcoal/50 text-xs uppercase tracking-widest2">Order ID</p>
              <p className="font-medium">{order.orderId}</p>
            </div>
            <div className="ml-6 text-left">
              <p className="text-charcoal/50 text-xs uppercase tracking-widest2">Total</p>
              <p className="font-medium">{formatPrice(order.total)}</p>
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/profile">View Orders</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
