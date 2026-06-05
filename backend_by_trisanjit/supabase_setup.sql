-- Supabase SQL Setup for Alumni Database

-- 1. Create the Users/Alumni table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    batch TEXT NOT NULL,
    department TEXT NOT NULL,
    company TEXT,
    linkedin TEXT,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'internal', -- 'internal' for alumni/students, 'admin' for administrators
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Add an index for quick lookup by email and phone since they are used for login
CREATE INDEX IF NOT EXISTS users_email_phone_idx ON public.users (email, phone);

-- 3. Set up Row Level Security (RLS)
-- We will manage data entirely via Next.js API route using the Service Role Key.
-- So we can enable RLS and just block public anon access.
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Allow nothing for public (since Next.js server will use Service Role to bypass RLS)
-- But if you want to allow authenticated users to read their own data via client, you could add policies here.
-- For now, our Next.js backend handles all the fetching.

-- 4. Insert an initial Admin user (change credentials as needed)
INSERT INTO public.users (name, batch, department, email, phone, role)
VALUES 
('Admin User', 'N/A', 'IT', 'admin@illumine.com', '0000000000', 'admin'),
('Rajdeep Das', 'N/A', 'IT', 'rajdeepdasyear2006@gmail.com', '7439121680', 'admin')
ON CONFLICT (email) DO NOTHING;

-- 5. Create Contact Requests table
CREATE TABLE IF NOT EXISTS public.contact_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_name TEXT NOT NULL,
    sender_email TEXT NOT NULL,
    sender_phone TEXT,
    receiver_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    receiver_name TEXT NOT NULL,
    receiver_email TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for contact_requests
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
