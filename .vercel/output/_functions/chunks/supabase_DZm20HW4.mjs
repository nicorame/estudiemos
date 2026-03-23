import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://chlglvgjzqtkfrwresta.supabase.co";
const supabaseAnonKey = "sb_publishable_YKJbSRbbrRUFC4pzoIXESA_-n_qd7h0";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase as s };
