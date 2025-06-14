
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_70%)]" />
      
      <div className="relative w-full max-w-md">
        <Card className="backdrop-blur-sm bg-background/95 shadow-2xl border-0 ring-1 ring-white/10">
          <CardHeader className="pb-4">
            <AuthHero />
          </CardHeader>
          <CardContent>
            <AuthTabs />
          </CardContent>
        </Card>
        
        {/* Floating elements for visual appeal */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000" />
      </div>
    </div>
  );
};

export default Auth;
