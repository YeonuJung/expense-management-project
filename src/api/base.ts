import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

const supabaseUrl: string = process.env.REACT_APP_SUPABASE_URL as string
const supabaseKey: string = process.env.REACT_APP_SUPABASE_ANON_KEY as string
  const supabase = createClient<Database>(supabaseUrl, supabaseKey);