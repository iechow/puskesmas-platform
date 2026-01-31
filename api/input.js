import { createClient } from "@supabase/supabase-js";
import Busboy from "busboy";

export const config = {
  api: { bodyParser: false }
};

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const data = {};
  let file;

  const bb = Busboy({ headers: req.headers });

  bb.on("field", (name, val) => {
    data[name] = val;
  });

  bb.on("file", (name, stream, info) => {
    const buffers = [];
    stream.on("data", d => buffers.push(d));
    stream.on("end", () => {
      file = {
        buffer: Buffer.concat(buffers),
        filename: info.filename,
        mimetype: info.mimeType
      };
    });
  });

  bb.on("finish", async () => {
    try {
      const fileName = `${Date.now()}-${file.filename}`;

      const { error } = await supabase.storage
        .from("kegiatan")
        .upload(fileName, file.buffer, {
          contentType: file.mimetype
        });

      if (error) return res.status(500).json({ error });

      const foto_url = `${process.env.SUPABASE_URL}/storage/v1/object/public/kegiatan/${fileName}`;

      const { error: dbError } = await supabase
        .from("kegiatan")
        .insert([
          {
            judul: data.judul,
            lokasi: data.lokasi,
            tanggal: data.tanggal,
            deskripsi: data.deskripsi,
            foto_url,
            status: "pending"
          }
        ]);

      if (dbError) return res.status(500).json({ error: dbError });

      res.json({ status: "ok" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  req.pipe(bb);
}
