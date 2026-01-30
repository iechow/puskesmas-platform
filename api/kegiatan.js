import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  try {
    const supabaseUrl = process.env.https://gtbxoqzndwjlkdyweopu.supabase.co
    const supabaseKey = process.env.sb_publishable_QEKeX4zE2L1Z7xnkxPJi1A_oGAlZJid

    // cek apakah env masuk
    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({
        error: "ENV_MISSING",
        SUPABASE_URL: supabaseUrl,
        SUPABASE_PUBLISHABLE_KEY: supabaseKey
      })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data, error } = await supabase
      .from('kegiatan')
      .select('*')
      .order('tanggal', { ascending: false })

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.status(200).json(data)

  } catch (err) {
    res.status(500).json({ crash: err.message })
  }
}
