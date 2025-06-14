
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { ResetPasswordForm } from './ResetPasswordForm';

export const AuthTabs = () => {
  const [searchParams] = useSearchParams();
  const [authMode, setAuthMode] = useState('signin');

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'reset') {
      setAuthMode('reset');
    }
  }, [searchParams]);

  const handleForgotPassword = () => {
    setAuthMode('forgot');
  };

  const handleBackToSignIn = () => {
    setAuthMode('signin');
  };

  if (authMode === 'forgot') {
    return <ForgotPasswordForm onBackToSignIn={handleBackToSignIn} />;
  }

  if (authMode === 'reset') {
    return <ResetPasswordForm />;
  }

  return (
    <Tabs defaultValue="signin" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger 
          value="signin" 
          className="transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Sign In
        </TabsTrigger>
        <TabsTrigger 
          value="signup"
          className="transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          Sign Up
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="signin" className="animate-fade-in">
        <SignInForm onForgotPassword={handleForgotPassword} />
      </TabsContent>
      
      <TabsContent value="signup" className="animate-fade-in">
        <SignUpForm />
      </TabsContent>
    </Tabs>
  );
};
