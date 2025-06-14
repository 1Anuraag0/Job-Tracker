
import React from 'react';
import { JobApplication } from '@/types/job';
import { KanbanColumn } from './KanbanColumn';

interface KanbanBoardProps {
  jobs: JobApplication[];
  onUpdateJobStatus: (jobId: string, newStatus: JobApplication['status']) => void;
  onDeleteJob: (jobId: string) => void;
}

const statusColumns = [
  { id: 'applied', title: 'Applied', color: 'bg-blue-50 border-blue-200' },
  { id: 'interviewing', title: 'Interviewing', color: 'bg-yellow-50 border-yellow-200' },
  { id: 'offer', title: 'Offer', color: 'bg-green-50 border-green-200' },
  { id: 'rejected', title: 'Rejected', color: 'bg-red-50 border-red-200' },
] as const;

export const KanbanBoard = ({ jobs, onUpdateJobStatus, onDeleteJob }: KanbanBoardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statusColumns.map(column => (
        <KanbanColumn
          key={column.id}
          title={column.title}
          status={column.id}
          jobs={jobs.filter(job => job.status === column.id)}
          onUpdateJobStatus={onUpdateJobStatus}
          onDeleteJob={onDeleteJob}
          className={column.color}
        />
      ))}
    </div>
  );
};
