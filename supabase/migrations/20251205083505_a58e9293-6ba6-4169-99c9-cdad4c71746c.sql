-- Rename contacts table to form_submissions
ALTER TABLE public.contacts RENAME TO form_submissions;

-- Update RLS policies names (need to drop and recreate with new names)
DROP POLICY IF EXISTS "Admins can read contacts" ON public.form_submissions;
DROP POLICY IF EXISTS "Admins can update contacts" ON public.form_submissions;
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.form_submissions;
DROP POLICY IF EXISTS "Contacts are not publicly accessible" ON public.form_submissions;

-- Recreate policies with updated names
CREATE POLICY "Admins can read form submissions" 
ON public.form_submissions 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update form submissions" 
ON public.form_submissions 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can submit form" 
ON public.form_submissions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Form submissions are not publicly accessible" 
ON public.form_submissions 
FOR SELECT 
USING (false);