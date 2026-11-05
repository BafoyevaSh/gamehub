
CREATE TABLE public.developer_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  company_name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_link TEXT,
  has_released_project BOOLEAN NOT NULL DEFAULT true,
  contact_method TEXT NOT NULL,
  contact_details TEXT NOT NULL,
  consent_given BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.developer_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit developer application"
ON public.developer_applications
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can view own applications"
ON public.developer_applications
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all applications"
ON public.developer_applications
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));
