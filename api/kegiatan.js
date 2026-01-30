import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.https://gtbxoqzndwjlkdyweopu.supabase.co,
  process.env.sb_publishable_QEKeX4zE2L1Z7xnkxPJi1A_oGAlZJid
)

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { data, error } = await supabase
    .from('kegiatan')
    .select('id, judul, tanggal, lokasi, foto_url, status')
    .order('tanggal', { ascending: true })

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.status(200).json(data)
}
