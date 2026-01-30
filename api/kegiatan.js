import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.https://gtbxoqzndwjlkdyweopu.supabase.co,
  process.env.sb_publishable_QEKeX4zE2L1Z7xnkxPJi1A_oGAlZJid
)

export default async function handler(req, res) {
  try {
    const { data, error } = await supabase
      .from('kegiatan')
      .select('*')
      .order('tanggal', { ascending: true })

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    res.status(200).json(data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
