export default async function handler(req, res) {
  res.status(200).json({
    SUPABASE_URL: process.env.SUPABASE_URL || null,
    SUPABASE_PUBLISHABLE_KEY: process.env.SUPABASE_PUBLISHABLE_KEY || null
  });
}
