import React, { useState } from 'react';
import { Plus, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { KanbanBoard } from '@/components/KanbanBoard';
import { AddJobForm } from '@/components/AddJobForm';
import { JobApplication } from '@/types/job';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([
    {
      id: '1',
      company: 'Google',
      role: 'Software Engineer Intern',
      applicationDate: '2024-01-15',
      jobLink: 'https://careers.google.com',
      status: 'applied',
      notes: 'Applied through university career portal'
    },
    {
      id: '2',
      company: 'Microsoft',
      role: 'Frontend Developer Intern',
      applicationDate: '2024-01-12',
      jobLink: 'https://careers.microsoft.com',
      status: 'interviewing',
      notes: 'First round completed, waiting for technical interview'
    },
    {
      id: '3',
      company: 'Meta',
      role: 'Product Manager Intern',
      applicationDate: '2024-01-10',
      jobLink: 'https://careers.meta.com',
      status: 'rejected',
      notes: 'Not selected after phone screening'
    }
  ]);

  const [isAddJobOpen, setIsAddJobOpen] = useState(false);

  const handleAddJob = (newJob: Omit<JobApplication, 'id'>) => {
    const job: JobApplication = {
      ...newJob,
      id: Date.now().toString()
    };
    setJobApplications(prev => [...prev, job]);
    setIsAddJobOpen(false);
  };

  const handleUpdateJobStatus = (jobId: string, newStatus: JobApplication['status']) => {
    setJobApplications(prev =>
      prev.map(job =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );
  };

  const handleDeleteJob = (jobId: string) => {
    setJobApplications(prev => prev.filter(job => job.id !== jobId));
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'Signed out',
      description: 'You have been signed out successfully.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Job Application Tracker</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your job applications in one place
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Dialog open={isAddJobOpen} onOpenChange={setIsAddJobOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Application
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Job Application</DialogTitle>
                </DialogHeader>
                <AddJobForm onSubmit={handleAddJob} />
              </DialogContent>
            </Dialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled>
                  {user?.email}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-lg border p-4">
            <div className="text-2xl font-bold text-primary">
              {jobApplications.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Applications</div>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <div className="text-2xl font-bold text-blue-600">
              {jobApplications.filter(job => job.status === 'interviewing').length}
            </div>
            <div className="text-sm text-muted-foreground">Interviewing</div>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <div className="text-2xl font-bold text-green-600">
              {jobApplications.filter(job => job.status === 'offer').length}
            </div>
            <div className="text-sm text-muted-foreground">Offers</div>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <div className="text-2xl font-bold text-red-600">
              {jobApplications.filter(job => job.status === 'rejected').length}
            </div>
            <div className="text-sm text-muted-foreground">Rejected</div>
          </div>
        </div>

        {/* Kanban Board */}
        <KanbanBoard
          jobs={jobApplications}
          onUpdateJobStatus={handleUpdateJobStatus}
          onDeleteJob={handleDeleteJob}
        />
      </div>
    </div>
  );
};

export default Index;
