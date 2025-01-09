-- Modify lms_courses table to handle SCORM packages
ALTER TABLE lms_courses 
DROP COLUMN IF EXISTS scorm_url,
ADD COLUMN IF NOT EXISTS scorm_package_path text NOT NULL,
ADD COLUMN IF NOT EXISTS scorm_entry_point text NOT NULL;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_lms_courses_published ON lms_courses(published);