
import React from 'react';
import { JobApplication } from '@/types/job';
import { JobCard } from './JobCard';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  title: string;
  status: JobApplication['status'];
  jobs: JobApplication[];
  onUpdateJobStatus: (jobId: string, newStatus: JobApplication['status']) => void;
  onDeleteJob: (jobId: string) => void;
  className?: string;
}

export const KanbanColumn = ({
  title,
  status,
  jobs,
  onUpdateJobStatus,
  onDeleteJob,
  className
}: KanbanColumnProps) => {
  return (
    <div className={cn("rounded-lg border-2 border-dashed p-4 min-h-[500px]", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-700">
          {title}
        </h3>
        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
          {jobs.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {jobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            onUpdateStatus={onUpdateJobStatus}
            onDelete={onDeleteJob}
          />
        ))}
        
        {jobs.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            <p className="text-sm">No applications</p>
          </div>
        )}
      </div>
    </div>
  );
};
