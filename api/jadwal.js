import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLISHABLE_KEY
  );

  const today = new Date().toISOString().split("T")[0];
  const seven = new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("kegiatan")
    .select("*")
    .eq("status", "published")
    .gte("tanggal", today)
    .lte("tanggal", seven)
    .order("tanggal", { ascending: true });

  if (error) {
    return res.status(500).json({ error });
  }

  res.json({ data });
}
