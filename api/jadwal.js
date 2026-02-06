import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("jadwal")
        .select("*")
        .order("tanggal", { ascending: true });

      if (error) throw error;

      return res.status(200).json({ status: "ok", data });
    }

    if (req.method === "POST") {
      const { judul, lokasi, tanggal, deskripsi } = req.body;

      const { data, error } = await supabase
        .from("jadwal")
        .insert([{ judul, lokasi, tanggal, deskripsi }]);

      if (error) throw error;

      return res.status(200).json({ status: "ok", data });
    }

    res.status(405).json({ error: "Method not allowed" });

  } catch (err) {
    console.error("API ERROR:", err);
    res.status(500).json({
      status: "error",
      message: err.message
    });
  }
}
