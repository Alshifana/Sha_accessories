import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileTabs } from "@/components/ProfileTabs";

export const metadata: Metadata = { title: "My Account" };

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware already guards this route, but this keeps the page safe if
  // it's ever reached directly (e.g. during local dev without middleware).
  if (!user || user.is_anonymous) redirect("/login?redirect=/profile");

  const [{ data: profile }, { data: addresses }, { data: orders }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("addresses").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
    supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
  ]);

  return (
    <ProfileTabs
      email={user.email ?? ""}
      profile={profile ?? { full_name: null, phone: null }}
      addresses={addresses ?? []}
      orders={orders ?? []}
    />
  );
}
