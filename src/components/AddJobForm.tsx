
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { JobApplication } from '@/types/job';

interface AddJobFormProps {
  onSubmit: (job: Omit<JobApplication, 'id'>) => void;
}

export const AddJobForm = ({ onSubmit }: AddJobFormProps) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    applicationDate: new Date().toISOString().split('T')[0],
    jobLink: '',
    status: 'applied' as JobApplication['status'],
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.company && formData.role) {
      onSubmit(formData);
      setFormData({
        company: '',
        role: '',
        applicationDate: new Date().toISOString().split('T')[0],
        jobLink: '',
        status: 'applied',
        notes: '',
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="company">Company *</Label>
        <Input
          id="company"
          value={formData.company}
          onChange={(e) => handleChange('company', e.target.value)}
          placeholder="e.g., Google, Microsoft"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role *</Label>
        <Input
          id="role"
          value={formData.role}
          onChange={(e) => handleChange('role', e.target.value)}
          placeholder="e.g., Software Engineer Intern"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="applicationDate">Application Date</Label>
        <Input
          id="applicationDate"
          type="date"
          value={formData.applicationDate}
          onChange={(e) => handleChange('applicationDate', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="jobLink">Job Link</Label>
        <Input
          id="jobLink"
          type="url"
          value={formData.jobLink}
          onChange={(e) => handleChange('jobLink', e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="applied">Applied</SelectItem>
            <SelectItem value="interviewing">Interviewing</SelectItem>
            <SelectItem value="offer">Offer</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          placeholder="Any additional notes about this application..."
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full">
        Add Application
      </Button>
    </form>
  );
};
