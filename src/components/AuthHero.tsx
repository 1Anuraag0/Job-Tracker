
import React from 'react';

export const AuthHero = () => {
  return (
    <div className="text-center space-y-4 mb-6 sm:mb-8">
      <div className="relative">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent leading-tight">
          Job Application Tracker
        </h1>
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20 blur-xl -z-10 opacity-70" />
      </div>
      
      <p className="text-white/80 text-sm sm:text-base max-w-xs sm:max-w-md mx-auto leading-relaxed px-2">
        Take control of your job search. Track applications, manage interviews, and land your dream job.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-white/70 px-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
          <span>Real-time tracking</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" />
          <span>Interview management</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50" />
          <span>Progress insights</span>
        </div>
      </div>
    </div>
  );
};
