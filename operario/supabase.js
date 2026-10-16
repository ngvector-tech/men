// ============================================================
// supabase.js — Configuración del cliente Supabase
// ============================================================

const SUPABASE_URL      = 'https://qjyyvobhzybugiqlmdyp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_dZibr37CaDLXFY7XAYjShQ_tTBoliYK';

// Cliente global
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.sb = sb;