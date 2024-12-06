import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://pxiukdgijvhvlvhmcpgr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4aXVrZGdpanZodmx2aG1jcGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4MjM5NDgsImV4cCI6MjA0NDM5OTk0OH0.JNxiU47IOCv5DT7TJ67-W4CiKgrPymRDWLbpmXjO6pQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
