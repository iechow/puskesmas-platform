import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY   // ⚠️ admin key
);

export default async function handler(req, res) {
  const { id } = req.body;

  const { error } = await supabase
    .from("kegiatan")
    .update({ status: "published" })
    .eq("id", id);

  if (error) return res.status(500).json(error);

  res.json({ status: "ok" });
}
