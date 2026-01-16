-- Add description field to lead_submissions table
-- Replaces contact_method with a freeform description field

ALTER TABLE lead_submissions 
ADD COLUMN IF NOT EXISTS description TEXT;

-- Make contact_method nullable for transition period
ALTER TABLE lead_submissions 
ALTER COLUMN contact_method DROP NOT NULL;

-- Add comment for documentation
COMMENT ON COLUMN lead_submissions.description IS 'Free-form description of client inquiry or needs';