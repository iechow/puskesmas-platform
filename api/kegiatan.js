export const config = {
  runtime: "nodejs"
};

import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  try {
    // 1. Ambil ENV dari Vercel
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY

    // 2. Endpoint debug (untuk memastikan ENV benar-benar masuk)
    if (req.query.debug === '1') {
      return res.status(200).json({
        SUPABASE_URL: supabaseUrl || null,
        SUPABASE_PUBLISHABLE_KEY: supabaseKey ? 'SET' : null
      })
    }

    // 3. Validasi ENV
    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({
        error: "Supabase ENV not set",
        supabaseUrl: supabaseUrl || null,
        supabaseKey: supabaseKey ? 'SET' : null
      })
    }

    // 4. Buat client Supabase
    const supabase = createClient(supabaseUrl, supabaseKey)

    // 5. Ambil data kegiatan
    const { data, error } = await supabase
      .from('kegiatan')
      .select('*')
      .order('id', { ascending: false })

    // 6. Jika Supabase error
    if (error) {
      return res.status(500).json({
        error: "Supabase query failed",
        details: error
      })
    }

    // 7. Kirim data ke client
    return res.status(200).json({
      status: "ok",
      count: data.length,
      data
    })

  } catch (e) {
    // 8. Jika server crash
    return res.status(500).json({
      error: "Server crashed",
      message: e.message
    })
  }
}
