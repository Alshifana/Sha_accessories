"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Package, MapPin, Heart, LogOut } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

type Address = {
  id: string;
  full_name: string;
  phone: string;
  line1: string;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
};

type OrderItem = {
  id: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  status: string;
  total: number;
  created_at: string;
  order_items: OrderItem[];
};

const tabs = [
  { key: "orders", label: "Orders", icon: Package },
  { key: "addresses", label: "Addresses", icon: MapPin },
  { key: "wishlist", label: "Wishlist", icon: Heart },
  { key: "account", label: "Account", icon: User },
] as const;

export function ProfileTabs({
  email,
  profile,
  addresses,
  orders,
}: {
  email: string;
  profile: { full_name: string | null; phone: string | null };
  addresses: Address[];
  orders: Order[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("orders");
  const { items } = useWishlist();

  const [fullName, setFullName] = useState(profile.full_name ?? "");
  const [phone, setPhone] = useState(profile.phone ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const profileUpdate: Database["public"]["Tables"]["profiles"]["Update"] = {
        full_name: fullName,
        phone,
      };
      const profilesTable: any = supabase.from("profiles");
      await profilesTable.update(profileUpdate).eq("id", user.id);
      setSaved(true);
    }
    setSaving(false);
  };

  return (
    <div className="pt-32 pb-24">
      <div className="container">
        <h1 className="font-display text-3xl">My Account</h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
          <nav className="flex flex-row gap-2 overflow-x-auto lg:flex-col">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  "flex items-center gap-2.5 whitespace-nowrap px-4 py-3 text-sm transition-colors",
                  tab === t.key ? "bg-charcoal text-ivory" : "text-charcoal/60 hover:bg-beige/60"
                )}
              >
                <t.icon size={15} /> {t.label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2.5 whitespace-nowrap px-4 py-3 text-sm text-charcoal/60 hover:bg-beige/60"
            >
              <LogOut size={15} /> Log out
            </button>
          </nav>

          <div>
            {tab === "orders" && (
              <div>
                <h2 className="font-display text-xl">Order History</h2>
                {orders.length === 0 ? (
                  <p className="mt-4 text-sm text-charcoal/50">
                    You have no past orders yet. Orders placed at checkout will appear here.
                  </p>
                ) : (
                  <ul className="mt-6 space-y-4">
                    {orders.map((o) => (
                      <li key={o.id} className="border border-border p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                          <span className="font-medium">Order #{o.id.slice(0, 8).toUpperCase()}</span>
                          <span className="text-xs uppercase tracking-widest2 text-gold-dark">{o.status}</span>
                        </div>
                        <p className="mt-1 text-xs text-charcoal/45">
                          {new Date(o.created_at).toLocaleDateString()} · {o.order_items?.length ?? 0} item(s)
                        </p>
                        <p className="mt-2 text-sm font-medium">{formatPrice(o.total)}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {tab === "addresses" && (
              <div>
                <h2 className="font-display text-xl">Saved Addresses</h2>
                {addresses.length === 0 ? (
                  <p className="mt-4 text-sm text-charcoal/50">
                    No saved addresses yet — add one during checkout to save it here for next time.
                  </p>
                ) : (
                  <ul className="mt-6 space-y-4">
                    {addresses.map((a) => (
                      <li key={a.id} className="border border-border p-4 text-sm">
                        <p className="font-medium">
                          {a.full_name}
                          {a.is_default && (
                            <span className="ml-2 text-xs uppercase tracking-widest2 text-gold-dark">
                              Default
                            </span>
                          )}
                        </p>
                        <p className="mt-1 text-charcoal/60">{a.phone}</p>
                        <p className="text-charcoal/60">
                          {a.line1}, {a.city}, {a.state} - {a.pincode}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {tab === "wishlist" && (
              <div>
                <h2 className="font-display text-xl">Wishlist</h2>
                {items.length === 0 ? (
                  <p className="mt-4 text-sm text-charcoal/50">Your wishlist is empty.</p>
                ) : (
                  <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3">
                    {items.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === "account" && (
              <div className="max-w-sm space-y-4">
                <h2 className="font-display text-xl">Account Details</h2>
                <label className="block">
                  <span className="text-xs uppercase tracking-widest2 text-charcoal/50">Full name</span>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1.5 w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-gold"
                  />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-widest2 text-charcoal/50">Email</span>
                  <input
                    value={email}
                    disabled
                    className="mt-1.5 w-full border border-border bg-beige/40 px-3 py-2.5 text-sm text-charcoal/50"
                  />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-widest2 text-charcoal/50">Phone</span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1.5 w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-gold"
                  />
                </label>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving…" : "Save changes"}
                </Button>
                {saved && <p className="text-xs text-gold-dark">Saved.</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
