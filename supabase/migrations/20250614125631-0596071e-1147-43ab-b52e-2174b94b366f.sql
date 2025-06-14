
-- Create a table for job applications
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  application_date DATE NOT NULL,
  job_link TEXT,
  status TEXT NOT NULL CHECK (status IN ('applied', 'interviewing', 'offer', 'rejected')),
  notes TEXT,
  resume_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to ensure users can only see their own job applications
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to SELECT their own job applications
CREATE POLICY "Users can view their own job applications" 
  ON public.job_applications 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to INSERT their own job applications
CREATE POLICY "Users can create their own job applications" 
  ON public.job_applications 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to UPDATE their own job applications
CREATE POLICY "Users can update their own job applications" 
  ON public.job_applications 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to DELETE their own job applications
CREATE POLICY "Users can delete their own job applications" 
  ON public.job_applications 
  FOR DELETE 
  USING (auth.uid() = user_id);
