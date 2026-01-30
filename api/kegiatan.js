import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  try {
    const supabase = createClient(
      process.env.https://gtbxoqzndwjlkdyweopu.supabase.co,
      process.env.sb_publishable_QEKeX4zE2L1Z7xnkxPJi1A_oGAlZJid
    );

    const { data, error } = await supabase
      .from("kegiatan")
      .select("id, judul, tanggal, lokasi, foto_url, status");

    if (error) {
      return res.status(500).json({
        supabase_error: error.message,
        detail: error
      });
    }

    return res.status(200).json({
      ok: true,
      data: data
    });

  } catch (e) {
    return res.status(500).json({
      crash: e.message,
      stack: e.stack
    });
  }
}
