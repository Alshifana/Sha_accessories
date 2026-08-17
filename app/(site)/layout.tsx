import { SiteShell } from "@/components/SiteShell";
import { getAllProducts } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const catalog = await getAllProducts();

  return <SiteShell catalog={catalog}>{children}</SiteShell>;
}
