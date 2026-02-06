import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLISHABLE_KEY
  );

  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const start = today.toISOString().split("T")[0];
  const end = nextWeek.toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("kegiatan")
    .select("*")
    .eq("status", "published")
    .gte("tanggal", start)
    .lte("tanggal", end)
    .order("tanggal", { ascending: true });

  if (error) {
    return res.status(500).json({ error });
  }

  res.json({ data });
}
if (req.method === "POST") {

  const { judul, lokasi, tanggal, deskripsi } = req.body;

  const { data, error } = await supabase
    .from("kegiatan")
    .insert([{
      judul,
      lokasi,
      tanggal,
      deskripsi,
      status: "published"
    }]);

  if (error) return res.status(500).json({ error });

  return res.json({ status: "ok", data });
}
