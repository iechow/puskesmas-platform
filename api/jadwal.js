export const config = {
  runtime: "nodejs"
};

import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );

  // ======================
  // GET → ambil jadwal
  // ======================

  if (req.method === "GET") {

    const { data, error } = await supabase
      .from("jadwal")
      .select("*")
      .order("tanggal", { ascending: true });

    if (error) return res.status(500).json({ error });

    return res.json({ status: "ok", data });
  }

  // ======================
  // POST → simpan jadwal
  // ======================

  if (req.method === "POST") {

    const { judul, lokasi, tanggal, deskripsi } = req.body;

    const { data, error } = await supabase
      .from("jadwal")
      .insert([{ judul, lokasi, tanggal, deskripsi }]);

    if (error) return res.status(500).json({ error });

    return res.json({ status: "ok", data });
  }

  res.status(405).json({ error: "Method not allowed" });
}
