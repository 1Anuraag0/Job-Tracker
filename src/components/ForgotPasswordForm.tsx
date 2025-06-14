
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';

interface ForgotPasswordFormProps {
  onBackToSignIn: () => void;
}

export const ForgotPasswordForm = ({ onBackToSignIn }: ForgotPasswordFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;

    const { error } = await resetPassword(email);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Reset failed',
        description: error.message,
      });
    } else {
      setIsEmailSent(true);
      toast({
        title: 'Check your email',
        description: 'We sent you a password reset link.',
      });
    }

    setIsLoading(false);
  };

  if (isEmailSent) {
    return (
      <div className="space-y-6 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Check your email</h2>
          <p className="text-muted-foreground">
            We've sent a password reset link to your email address.
          </p>
        </div>
        
        <Button 
          variant="outline" 
          onClick={onBackToSignIn}
          className="w-full"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to sign in
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Reset your password</h2>
        <p className="text-muted-foreground">
          Enter your email address and we'll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="reset-email">Email</Label>
          <Input
            id="reset-email"
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2"
            autoFocus
          />
        </div>

        <div className="space-y-3">
          <Button 
            type="submit" 
            className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]" 
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send reset link
          </Button>

          <Button 
            type="button"
            variant="ghost" 
            onClick={onBackToSignIn}
            className="w-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to sign in
          </Button>
        </div>
      </form>
    </div>
  );
};
