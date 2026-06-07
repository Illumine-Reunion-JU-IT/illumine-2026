-- Supabase SQL Setup for Profile Update Requests

CREATE TABLE IF NOT EXISTS public.profile_update_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    alumni_name TEXT NOT NULL,
    alumni_batch TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    update_type TEXT NOT NULL, -- e.g., 'Email', 'Phone', 'Company', 'Other'
    correct_details TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'resolved', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for profile_update_requests
ALTER TABLE public.profile_update_requests ENABLE ROW LEVEL SECURITY;
