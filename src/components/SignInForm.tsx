
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import { SocialLoginButtons } from './SocialLoginButtons';

export const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Sign in failed',
        description: error.message === 'Invalid login credentials' 
          ? 'Invalid email or password. Please check your credentials and try again.'
          : error.message,
      });
    } else {
      toast({
        title: 'Welcome back! 🎉',
        description: 'You have been signed in successfully.',
      });
      navigate('/');
    }

    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <SocialLoginButtons />
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/20" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-transparent px-2 text-white/60">Or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signin-email" className="text-white/90 text-sm">Email</Label>
          <Input
            id="signin-email"
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20 backdrop-blur-sm transition-all duration-200 text-sm sm:text-base py-2 sm:py-3"
            autoFocus
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="signin-password" className="text-white/90 text-sm">Password</Label>
          <div className="relative">
            <Input
              id="signin-password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20 backdrop-blur-sm transition-all duration-200 pr-10 text-sm sm:text-base py-2 sm:py-3"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-white/10 text-white/70 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-white/30 bg-white/10 text-purple-500 focus:ring-purple-500/50"
            />
            <Label htmlFor="remember" className="text-sm font-normal text-white/80">
              Remember me
            </Label>
          </div>
          
          <Button variant="link" className="px-0 font-normal text-sm text-white/70 hover:text-white h-auto">
            Forgot password?
          </Button>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg text-sm sm:text-base py-2 sm:py-3 mt-6" 
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>
      </form>
    </div>
  );
};
