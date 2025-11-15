import { createBrowserClient } from '@supabase/auth-helpers-nextjs'

// Create a Supabase client for use in Client Components
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )