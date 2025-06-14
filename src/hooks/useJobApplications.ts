
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { JobApplication } from '@/types/job';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useJobApplications = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch job applications
  const { data: jobApplications = [], isLoading, error } = useQuery({
    queryKey: ['jobApplications', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return data.map(app => ({
        id: app.id,
        company: app.company,
        role: app.role,
        applicationDate: app.application_date,
        jobLink: app.job_link || '',
        status: app.status as JobApplication['status'],
        notes: app.notes || '',
        resumeUrl: app.resume_url || ''
      }));
    },
    enabled: !!user?.id,
  });

  // Add job application
  const addJobMutation = useMutation({
    mutationFn: async (newJob: Omit<JobApplication, 'id'>) => {
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('job_applications')
        .insert({
          user_id: user.id,
          company: newJob.company,
          role: newJob.role,
          application_date: newJob.applicationDate,
          job_link: newJob.jobLink || null,
          status: newJob.status,
          notes: newJob.notes || null,
          resume_url: newJob.resumeUrl || null
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobApplications', user?.id] });
      toast({
        title: 'Application added',
        description: 'Your job application has been saved successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to add job application.',
        variant: 'destructive',
      });
    },
  });

  // Update job status
  const updateJobStatusMutation = useMutation({
    mutationFn: async ({ jobId, newStatus }: { jobId: string; newStatus: JobApplication['status'] }) => {
      const { error } = await supabase
        .from('job_applications')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', jobId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobApplications', user?.id] });
      toast({
        title: 'Status updated',
        description: 'Application status has been updated successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update job status.',
        variant: 'destructive',
      });
    },
  });

  // Delete job application
  const deleteJobMutation = useMutation({
    mutationFn: async (jobId: string) => {
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', jobId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobApplications', user?.id] });
      toast({
        title: 'Application deleted',
        description: 'Job application has been deleted successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete job application.',
        variant: 'destructive',
      });
    },
  });

  return {
    jobApplications,
    isLoading,
    error,
    addJob: addJobMutation.mutate,
    updateJobStatus: updateJobStatusMutation.mutate,
    deleteJob: deleteJobMutation.mutate,
    isAddingJob: addJobMutation.isPending,
    isUpdatingStatus: updateJobStatusMutation.isPending,
    isDeletingJob: deleteJobMutation.isPending,
  };
};
