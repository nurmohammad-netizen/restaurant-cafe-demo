import { createClient } from "@/lib/supabase/server";
import { DashboardClient } from "@/app/admin/dashboard/DashboardClient";
import type { Shop } from "@/lib/database.types";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: shop } = await supabase
    .from("shops")
    .select("*")
    .eq("is_active", true)
    .limit(1)
    .maybeSingle<Shop>();

  return <DashboardClient shop={shop} userEmail={user?.email ?? null} />;
}
