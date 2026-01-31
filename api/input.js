import { createClient } from "@supabase/supabase-js";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const formData = await new Promise((resolve, reject) => {
    const busboy = require("busboy");
    const bb = busboy({ headers: req.headers });
    let file;

    bb.on("file", (_, f, info) => {
      const buffers = [];
      f.on("data", d => buffers.push(d));
      f.on("end", () => {
        file = {
          buffer: Buffer.concat(buffers),
          filename: info.filename,
          mimetype: info.mimeType
        };
      });
    });

    bb.on("finish", () => resolve(file));
    req.pipe(bb);
  });

  const fileName = `${Date.now()}-${formData.filename}`;

  const { data, error } = await supabase.storage
    .from("kegiatan")
    .upload(fileName, formData.buffer, {
      contentType: formData.mimetype
    });

  if (error) return res.status(500).json({ error });

  const url = `${process.env.SUPABASE_URL}/storage/v1/object/public/kegiatan/${fileName}`;

  res.json({ url });
}
