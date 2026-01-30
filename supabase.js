// === SUPABASE CONFIG ===
const SUPABASE_URL = "https://gtbxoqzndwjlkdyweopu.supabase.co";

// PAKAI publishable key (sb_publishable...), BUKAN anon JWT
const SUPABASE_KEY = "sb_publishable_QEKeX4zE2L1Z7xnkxPJi1A_oGAlZJid";

// === INIT CLIENT ===
const { createClient } = supabase;
window.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// === TEST ===
alert("Supabase siap");