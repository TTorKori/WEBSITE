import { SupabaseClient, createClient } from "@supabase/supabase-js";

const supabaseUrl: string | undefined = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey: string | undefined = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseClient: SupabaseClient;

if (!(supabaseUrl && supabaseKey)) {
	throw new Error("Cannot connect to Supabase");
}

export default supabaseClient = createClient(supabaseUrl, supabaseKey);






