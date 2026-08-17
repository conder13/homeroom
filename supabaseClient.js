// supabaseClient.js
//
// One shared Supabase client for the whole app. Reads the URL/key from
// environment variables (see .env.example) rather than hardcoding them,
// so your keys aren't sitting in committed source. Parcel picks up a
// .env file automatically -- no extra config needed, just make sure
// `.env` (not `.env.example`) exists with real values before building.

import { createClient } from "@supabase/supabase-js";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    console.warn(
        "Supabase isn't configured -- copy .env.example to .env and fill in " +
        "your project's URL and anon key. The app will still work locally " +
        "(localStorage only) until you do."
    );
}

export const supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_ANON_KEY || ""
);