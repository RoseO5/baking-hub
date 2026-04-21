import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qvfxpnlpinoxjemjqaap.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2ZnhwbmxwaW5veGplbWpxYWFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1NjAxNTQsImV4cCI6MjA5MjEzNjE1NH0.5BJzV-c6820wiYrN7wtA4TqxpSMiCgdLw3JBZ9X4GnU";

export const supabase = createClient(supabaseUrl, supabaseKey);
