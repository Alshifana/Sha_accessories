"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MapPin, Truck, CreditCard, ClipboardList } from "lucide-react";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { cn, formatPrice } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

type Address = {
  fullName: string;
  phone: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
};

const steps = [
  { key: "address", label: "Address", icon: MapPin },
  { key: "shipping", label: "Shipping", icon: Truck },
  { key: "payment", label: "Payment", icon: CreditCard },
  { key: "review", label: "Review", icon: ClipboardList },
] as const;

const shippingOptions = [
  { id: "standard", label: "Standard", eta: "5-7 business days", price: 0 },
  { id: "express", label: "Express", eta: "2-3 business days", price: 149 },
];

const paymentOptions = [
  { id: "upi", label: "UPI" },
  { id: "card", label: "Credit / Debit Card" },
  { id: "cod", label: "Cash on Delivery" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { detailedItems, subtotal, clearCart } = useCart();
  const [stepIndex, setStepIndex] = useState(0);
  const [address, setAddress] = useState<Address>({
    fullName: "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [shippingId, setShippingId] = useState("standard");
  const [paymentId, setPaymentId] = useState("upi");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");
  const [createAccount, setCreateAccount] = useState(false);
  const [password, setPassword] = useState("");
  const [placing, setPlacing] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  useEffect(() => {
    const establishCheckoutSession = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setIsAnonymous(user.is_anonymous === true);
        setAuthReady(true);
        return;
      }

      const { data, error } = await supabase.auth.signInAnonymously();
      if (error || !data.user) {
        setOrderError(error?.message ?? "We could not start a secure checkout session.");
        return;
      }

      setIsAnonymous(true);
      setAuthReady(true);
    };

    void establishCheckoutSession();
  }, []);

  const shippingCost = shippingOptions.find((s) => s.id === shippingId)?.price ?? 0;
  const total = subtotal + shippingCost;

  const addressValid =
    authReady &&
    address.fullName &&
    address.phone.length >= 10 &&
    address.line1 &&
    address.city &&
    address.state &&
    address.pincode.length === 6 &&
    (!isAnonymous || (guestEmail && (!createAccount || password.length >= 6)));

  const goNext = () => setStepIndex((i) => Math.min(steps.length - 1, i + 1));
  const goBack = () => setStepIndex((i) => Math.max(0, i - 1));

  const finishOrder = (orderId: string, isGuestCheckout: boolean, accountCreated = false) => {
    sessionStorage.setItem(
      "aurelie_last_order",
      JSON.stringify({
        orderId,
        total,
        address,
        items: detailedItems.length,
        guestCheckout: isGuestCheckout,
        accountCreated,
      })
    );

    setTimeout(() => {
      clearCart();
      router.push("/order-success");
    }, 600);
  };

  const placeOrder = async () => {
    setPlacing(true);
    setOrderError(null);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setOrderError("We could not start a secure checkout session. Please refresh and try again.");
      setPlacing(false);
      return;
    }

    const isGuest = user.is_anonymous === true;
    if (isGuest && createAccount) {
      const { error: updateUserError } = await supabase.auth.updateUser({
        email: guestEmail,
        password,
        data: { full_name: address.fullName },
      });

      if (updateUserError) {
        setOrderError(updateUserError.message);
        setPlacing(false);
        return;
      }
    }

    const addressInsert: Database["public"]["Tables"]["addresses"]["Insert"] = {
      user_id: user.id,
      full_name: address.fullName,
      phone: address.phone,
      line1: address.line1,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    };

    const { data: addressRow, error: addressError } = (await supabase
      .from("addresses")
      .insert([addressInsert] as any)
      .select()
      .single()) as any;

    if (addressError) {
      setOrderError(addressError.message);
      setPlacing(false);
      return;
    }

    const orderInsert: Database["public"]["Tables"]["orders"]["Insert"] = {
      user_id: user.id,
      subtotal,
      shipping: shippingCost,
      discount: 0,
      total,
      payment_method: paymentId,
      address_id: addressRow.id,
      ...(isGuest
        ? {
            guest_email: guestEmail,
            shipping_address: {
              full_name: address.fullName,
              phone: address.phone,
              line1: address.line1,
              city: address.city,
              state: address.state,
              pincode: address.pincode,
            },
          }
        : {}),
    };

    const { data: orderRow, error: createOrderError } = (await supabase
      .from("orders")
      .insert([orderInsert] as any)
      .select()
      .single()) as any;

    if (createOrderError || !orderRow) {
      setOrderError(createOrderError?.message ?? "The order could not be created.");
      setPlacing(false);
      return;
    }

    const orderItemsInsert: Database["public"]["Tables"]["order_items"]["Insert"][] =
      detailedItems.map(({ product, item }) => ({
        order_id: orderRow.id,
        product_id: product.id,
        product_name: product.name,
        product_image: product.images[0],
        variant_id: item.variantId ?? null,
        quantity: item.quantity,
        price: product.price,
      }));

    const { error: itemError } = await supabase.from("order_items").insert(
      orderItemsInsert as any
    );

    if (itemError) {
      setOrderError(itemError.message);
      setPlacing(false);
      return;
    }

    if (isGuest) {
      const profileUpdate: Database["public"]["Tables"]["profiles"]["Update"] = {
        full_name: address.fullName,
        phone: address.phone,
      };
      const profilesTable: any = supabase.from("profiles");
      await profilesTable.update(profileUpdate).eq("id", user.id);
    }

    finishOrder(orderRow.id.slice(0, 8).toUpperCase(), isGuest, isGuest && createAccount);
  };

  if (detailedItems.length === 0) {
    return (
      <div className="pt-32 pb-24 container text-center">
        <p className="text-charcoal/60">Your bag is empty — add something before checking out.</p>
        <Button asChild className="mt-6">
          <a href="/shop">Browse the shop</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <div className="container">
        <SectionHeading eyebrow="Almost there" title="Checkout" align="left" />

        {/* Stepper */}
        <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap px-3 py-2 text-xs uppercase tracking-widest2",
                  i === stepIndex
                    ? "bg-charcoal text-ivory"
                    : i < stepIndex
                    ? "text-gold-dark"
                    : "text-charcoal/35"
                )}
              >
                {i < stepIndex ? <Check size={13} /> : <s.icon size={13} />}
                {s.label}
              </div>
              {i < steps.length - 1 && <div className="h-px w-6 bg-border" />}
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_340px]">
          <div className="min-h-[360px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={steps[stepIndex].key}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3 }}
              >
                {stepIndex === 0 && (
                  <div className="space-y-4">
                    <h3 className="font-display text-xl">Shipping Address</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {isAnonymous && (
                        <Field
                          className="sm:col-span-2"
                          label="Email"
                          type="email"
                          value={guestEmail}
                          onChange={setGuestEmail}
                        />
                      )}
                      <Field label="Full name" value={address.fullName} onChange={(v) => setAddress({ ...address, fullName: v })} />
                      <Field label="Phone number" value={address.phone} onChange={(v) => setAddress({ ...address, phone: v.replace(/\D/g, "").slice(0, 10) })} />
                      <Field className="sm:col-span-2" label="Address line" value={address.line1} onChange={(v) => setAddress({ ...address, line1: v })} />
                      <Field label="City" value={address.city} onChange={(v) => setAddress({ ...address, city: v })} />
                      <Field label="State" value={address.state} onChange={(v) => setAddress({ ...address, state: v })} />
                      <Field label="Pincode" value={address.pincode} onChange={(v) => setAddress({ ...address, pincode: v.replace(/\D/g, "").slice(0, 6) })} />
                    </div>
                    {isAnonymous && (
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm text-charcoal/70">
                          <input
                            type="checkbox"
                            checked={createAccount}
                            onChange={(e) => setCreateAccount(e.target.checked)}
                            className="accent-gold"
                          />
                          Create an account?
                        </label>
                        {createAccount && (
                          <Field
                            label="Password"
                            type="password"
                            minLength={6}
                            value={password}
                            onChange={setPassword}
                          />
                        )}
                      </div>
                    )}
                    <Button onClick={goNext} disabled={!addressValid} className="mt-2">
                      Continue to shipping
                    </Button>
                  </div>
                )}

                {stepIndex === 1 && (
                  <div className="space-y-4">
                    <h3 className="font-display text-xl">Shipping Method</h3>
                    <div className="space-y-3">
                      {shippingOptions.map((s) => (
                        <label
                          key={s.id}
                          className={cn(
                            "flex cursor-pointer items-center justify-between border p-4 text-sm",
                            shippingId === s.id ? "border-gold bg-sand" : "border-border"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              checked={shippingId === s.id}
                              onChange={() => setShippingId(s.id)}
                              className="accent-gold"
                            />
                            <div>
                              <p className="font-medium">{s.label}</p>
                              <p className="text-xs text-charcoal/50">{s.eta}</p>
                            </div>
                          </div>
                          <span>{s.price === 0 ? "Free" : formatPrice(s.price)}</span>
                        </label>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={goBack}>Back</Button>
                      <Button onClick={goNext}>Continue to payment</Button>
                    </div>
                  </div>
                )}

                {stepIndex === 2 && (
                  <div className="space-y-4">
                    <h3 className="font-display text-xl">Payment Method</h3>
                    <div className="space-y-3">
                      {paymentOptions.map((p) => (
                        <label
                          key={p.id}
                          className={cn(
                            "flex cursor-pointer items-center gap-3 border p-4 text-sm",
                            paymentId === p.id ? "border-gold bg-sand" : "border-border"
                          )}
                        >
                          <input
                            type="radio"
                            checked={paymentId === p.id}
                            onChange={() => setPaymentId(p.id)}
                            className="accent-gold"
                          />
                          {p.label}
                        </label>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={goBack}>Back</Button>
                      <Button onClick={goNext}>Review order</Button>
                    </div>
                  </div>
                )}

                {stepIndex === 3 && (
                  <div className="space-y-6">
                    <h3 className="font-display text-xl">Review Your Order</h3>
                    <div className="border border-border p-4 text-sm">
                      <p className="text-xs uppercase tracking-widest2 text-charcoal/40">Deliver to</p>
                      <p className="mt-1">{address.fullName}, {address.phone}</p>
                      <p className="text-charcoal/70">{address.line1}, {address.city}, {address.state} - {address.pincode}</p>
                    </div>
                    <div className="border border-border p-4 text-sm flex justify-between">
                      <span className="text-charcoal/60">Payment method</span>
                      <span className="capitalize">{paymentOptions.find((p) => p.id === paymentId)?.label}</span>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={goBack}>Back</Button>
                      <Button onClick={placeOrder} disabled={placing}>
                        {placing ? "Placing order…" : "Place Order"}
                      </Button>
                    </div>
                    {orderError && (
                      <p className="text-sm text-red-600">
                        We could not save this order: {orderError}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Order summary sidebar */}
          <aside className="h-fit border border-border p-6">
            <h3 className="font-display text-lg">Order Summary</h3>
            <ul className="mt-4 space-y-3">
              {detailedItems.map(({ product, item }) => (
                <li key={`${product.id}-${item.variantId}`} className="flex items-center gap-3">
                  <div className="relative h-14 w-11 shrink-0 overflow-hidden bg-sand">
                    <Image src={product.images[0]} alt={product.name} fill sizes="44px" className="object-cover" />
                  </div>
                  <div className="flex-1 text-xs">
                    <p className="line-clamp-1">{product.name}</p>
                    <p className="text-charcoal/45">Qty {item.quantity}</p>
                  </div>
                  <span className="text-xs font-medium">{formatPrice(product.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between text-charcoal/70">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-charcoal/70">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base font-medium">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  className,
  type = "text",
  minLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
  type?: string;
  minLength?: number;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="text-xs uppercase tracking-widest2 text-charcoal/50">{label}</span>
      <input
        type={type}
        minLength={minLength}
        required={type === "email" || type === "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-gold"
      />
    </label>
  );
}
