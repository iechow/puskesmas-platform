export const config = {
  runtime: "nodejs"
};

import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return res.status(500).json({
        error: "Supabase env missing",
        supabaseUrl: supabaseUrl ? "OK" : "MISSING",
        serviceKey: serviceKey ? "OK" : "MISSING"
      });
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    // ===============================
    // GET → ambil kegiatan approved
    // ===============================
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("kegiatan")
        .select("*")
        .eq("status", "approved")
        .order("tanggal", { ascending: false });

      if (error) {
        return res.status(500).json({ error });
      }

      return res.json({ status: "ok", data });
    }

    // ===============================
    // POST → kirim usulan baru
    // ===============================
    if (req.method === "POST") {
      const { judul, lokasi, tanggal, deskripsi, foto_url } = req.body;

      const { data, error } = await supabase
        .from("kegiatan")
        .insert([
          {
            judul,
            lokasi,
            tanggal,
            deskripsi,
            foto_url,
            status: "pending"
          }
        ])
        .select()
        .single();

      if (error) {
        return res.status(500).json({ error });
      }

      return res.json({ status: "ok", data });
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
