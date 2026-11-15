export const SUPABASE_URL = 'https://dzpwdfmmrvnnmqbnbjhp.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_Yf_ogM6CQQDZc1rwnutc9Q_SlNOz2J9';

export const supabaseConfigured =
  SUPABASE_URL.startsWith('https://')
  && !SUPABASE_URL.includes('YOUR_PROJECT_REF')
  && SUPABASE_ANON_KEY.trim().length > 0
  && !SUPABASE_ANON_KEY.includes('YOUR_SUPABASE_ANON_KEY');
