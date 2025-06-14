
import React from 'react';

export const AuthHero = () => {
  return (
    <div className="text-center space-y-4 mb-8">
      <div className="relative">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Job Application Tracker
        </h1>
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-600/20 blur-xl -z-10 opacity-70" />
      </div>
      
      <p className="text-muted-foreground max-w-md mx-auto">
        Take control of your job search. Track applications, manage interviews, and land your dream job.
      </p>
      
      <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Real-time tracking</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span>Interview management</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
          <span>Progress insights</span>
        </div>
      </div>
    </div>
  );
};
