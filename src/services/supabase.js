import { createClient } from "@supabase/supabase-js";

const url = "https://kjvgesvqoblnntmvqaid.supabase.co";
const publicKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtqdmdlc3Zxb2Jsbm50bXZxYWlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ0MTA0NjgsImV4cCI6MjAyOTk4NjQ2OH0.C3Irr22BksoUKfUwrA7BPsrggpxzvyX51TBVtHuDWt8";
// Create a single supabase client for interacting with your database
const supabase = createClient(url, publicKey);

export default supabase;
