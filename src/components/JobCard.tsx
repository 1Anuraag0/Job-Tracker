
import React, { useState } from 'react';
import { MoreHorizontal, ExternalLink, Calendar, Trash2 } from 'lucide-react';
import { JobApplication } from '@/types/job';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface JobCardProps {
  job: JobApplication;
  onUpdateStatus: (jobId: string, newStatus: JobApplication['status']) => void;
  onDelete: (jobId: string) => void;
}

const statusColors = {
  applied: 'bg-blue-100 text-blue-800',
  interviewing: 'bg-yellow-100 text-yellow-800',
  offer: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const statusOptions = [
  { value: 'applied', label: 'Applied' },
  { value: 'interviewing', label: 'Interviewing' },
  { value: 'offer', label: 'Offer' },
  { value: 'rejected', label: 'Rejected' },
] as const;

export const JobCard = ({ job, onUpdateStatus, onDelete }: JobCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 mb-1">{job.company}</h4>
          <p className="text-sm text-gray-600 mb-2">{job.role}</p>
          <Badge className={statusColors[job.status]} variant="secondary">
            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
          </Badge>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {statusOptions
              .filter(option => option.value !== job.status)
              .map(option => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => onUpdateStatus(job.id, option.value)}
                >
                  Move to {option.label}
                </DropdownMenuItem>
              ))}
            <DropdownMenuItem
              onClick={() => onDelete(job.id)}
              className="text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {formatDate(job.applicationDate)}
        </div>
        
        {job.jobLink && (
          <a
            href={job.jobLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-blue-600 transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            View Job
          </a>
        )}
      </div>
      
      {job.notes && (
        <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600">
          {job.notes}
        </div>
      )}
    </div>
  );
};
