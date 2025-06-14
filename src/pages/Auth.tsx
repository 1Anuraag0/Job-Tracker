
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { AuthHero } from '@/components/AuthHero';
import { AuthTabs } from '@/components/AuthTabs';

const Auth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Enhanced background decoration with animated gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-400/20 via-pink-400/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-400/15 via-indigo-400/10 to-transparent" />
      <div className="absolute inset-0 bg-grid-white/5 bg-grid-16 [mask-image:radial-gradient(white,transparent_70%)]" />
      
      {/* Floating gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-40 sm:h-40 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-1/3 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse delay-500" />
      
      <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
        <Card className="backdrop-blur-xl bg-white/10 shadow-2xl border border-white/20 ring-1 ring-white/10 rounded-2xl sm:rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
          
          <CardHeader className="pb-4 px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 relative">
            <AuthHero />
          </CardHeader>
          
          <CardContent className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 relative">
            <AuthTabs />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
