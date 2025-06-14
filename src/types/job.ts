
export interface JobApplication {
  id: string;
  company: string;
  role: string;
  applicationDate: string;
  jobLink: string;
  status: 'applied' | 'interviewing' | 'offer' | 'rejected';
  notes?: string;
  resumeUrl?: string;
}

export type JobStatus = JobApplication['status'];
