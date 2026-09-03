/*
# Create quiz_leads table for quiz form submissions

1. New Tables
- `quiz_leads`
  - `id` (uuid, primary key)
  - `name` (text, visitor's first name)
  - `phone` (text, contact phone number)
  - `answers` (jsonb, all quiz answers as key-value pairs)
  - `created_at` (timestamp, defaults to now)
2. Security
- Enable RLS on `quiz_leads`.
- Allow anon + authenticated to INSERT (quiz is public, no sign-in).
- No SELECT/UPDATE/DELETE for anon — only the owner (admin) can read leads.
*/

CREATE TABLE IF NOT EXISTS quiz_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_quiz_leads" ON quiz_leads;
CREATE POLICY "anon_insert_quiz_leads" ON quiz_leads FOR INSERT
  TO anon, authenticated WITH CHECK (true);