
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

export const AuthTabs = () => {
  return (
    <Tabs defaultValue="signin" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-1">
        <TabsTrigger 
          value="signin" 
          className="transition-all duration-200 data-[state=active]:bg-white/20 data-[state=active]:text-white data-[state=active]:shadow-lg text-white/70 hover:text-white/90 rounded-lg text-sm sm:text-base py-2 sm:py-3"
        >
          Sign In
        </TabsTrigger>
        <TabsTrigger 
          value="signup"
          className="transition-all duration-200 data-[state=active]:bg-white/20 data-[state=active]:text-white data-[state=active]:shadow-lg text-white/70 hover:text-white/90 rounded-lg text-sm sm:text-base py-2 sm:py-3"
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
