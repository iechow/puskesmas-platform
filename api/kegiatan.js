import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({
        error: "Supabase env not set",
        SUPABASE_URL: !!supabaseUrl,
        SUPABASE_KEY: !!supabaseKey
      })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data, error } = await supabase
      .from("kegiatan")
      .select("*")
      .order("id", { ascending: false })

    if (error) {
      return res.status(500).json({ error })
    }

    return res.status(200).json(data)

  } catch (e) {
    return res.status(500).json({
      message: "Server crash",
      error: e.message
    })
  }
}
