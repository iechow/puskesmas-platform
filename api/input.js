import { createClient } from "@supabase/supabase-js";

export const config = {
  runtime: "edge"
};

export default async function handler(req) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const form = await req.formData();

    const judul = form.get("judul");
    const lokasi = form.get("lokasi");
    const tanggal = form.get("tanggal");
    const deskripsi = form.get("deskripsi");
    const file = form.get("foto");

    if (!file) {
      return new Response(
        JSON.stringify({ error: "No file uploaded" }),
        { status: 400 }
      );
    }

    const fileName = `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("kegiatan")
      .upload(fileName, file, {
        contentType: file.type
      });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    const photoUrl =
      `${process.env.SUPABASE_URL}/storage/v1/object/public/kegiatan/${fileName}`;

    const { error: dbError } = await supabase
      .from("kegiatan")
      .insert([
        {
          judul,
          lokasi,
          tanggal,
          deskripsi,
          foto_url: photoUrl,
          status: "pending"
        }
      ]);

    if (dbError) {
      return new Response(JSON.stringify({ error: dbError }), { status: 500 });
    }

    return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e.message }),
      { status: 500 }
    );
  }
}
