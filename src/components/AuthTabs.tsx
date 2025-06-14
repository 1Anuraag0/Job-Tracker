
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

export const AuthTabs = () => {
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
        <SignInForm />
      </TabsContent>
      
      <TabsContent value="signup" className="animate-fade-in">
        <SignUpForm />
      </TabsContent>
    </Tabs>
  );
};
