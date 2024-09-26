import { createClient } from "@supabase/supabase-js";

export const supabase = createClient("https://gbtcisoyrxpgtehmlmbg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdidGNpc295cnhwZ3RlaG1sbWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzMzc5NTQsImV4cCI6MjA0MDkxMzk1NH0.b73k5SD6r_VFwo1Y55qTC68rMndcSLOU_xK936JQ7_Q")
