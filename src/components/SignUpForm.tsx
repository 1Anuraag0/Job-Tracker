
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Eye, EyeOff, Check, X, AlertTriangle } from 'lucide-react';
import { SocialLoginButtons } from './SocialLoginButtons';

// Common passwords to check against
const COMMON_PASSWORDS = [
  'password', '123456', '123456789', 'qwerty', 'abc123', 'password123',
  'admin', 'letmein', 'welcome', 'monkey', '1234567890', 'dragon',
  'sunshine', 'princess', 'football', 'iloveyou', 'superman', 'trustno1'
];

export const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const { signUp } = useAuth();
  const { toast } = useToast();

  const passwordRequirements = [
    { label: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
    { label: 'Contains uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
    { label: 'Contains lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
    { label: 'Contains number', test: (pwd: string) => /\d/.test(pwd) },
    { label: 'Contains special character', test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
    { label: 'No common words', test: (pwd: string) => !COMMON_PASSWORDS.some(common => pwd.toLowerCase().includes(common.toLowerCase())) },
    { label: 'No repeated characters (3+)', test: (pwd: string) => !/(.)\1{2,}/.test(pwd) },
    { label: 'No sequential numbers', test: (pwd: string) => !/123|234|345|456|567|678|789|890/.test(pwd) }
  ];

  const getPasswordStrength = (pwd: string) => {
    const score = passwordRequirements.filter(req => req.test(pwd)).length;
    if (score === 0) return { strength: 'none', color: 'bg-gray-200', textColor: 'text-gray-500' };
    if (score <= 2) return { strength: 'very weak', color: 'bg-red-500', textColor: 'text-red-600' };
    if (score <= 4) return { strength: 'weak', color: 'bg-orange-500', textColor: 'text-orange-600' };
    if (score <= 6) return { strength: 'fair', color: 'bg-yellow-500', textColor: 'text-yellow-600' };
    if (score <= 7) return { strength: 'good', color: 'bg-blue-500', textColor: 'text-blue-600' };
    return { strength: 'strong', color: 'bg-green-500', textColor: 'text-green-600' };
  };

  const checkPasswordCompromised = (pwd: string) => {
    // Check against common patterns
    const commonPatterns = [
      /^(.)\1+$/, // All same character
      /^(012|123|234|345|456|567|678|789|890|901)+/, // Sequential numbers
      /^(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)+/i, // Sequential letters
      /^[0-9]+$/, // Only numbers
      /^[a-zA-Z]+$/, // Only letters
    ];

    return commonPatterns.some(pattern => pattern.test(pwd));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;

    // Enhanced password validation
    const failedRequirements = passwordRequirements.filter(req => !req.test(password));
    if (failedRequirements.length > 0) {
      toast({
        variant: 'destructive',
        title: 'Password requirements not met',
        description: `Please ensure your password meets all security requirements.`,
      });
      setIsLoading(false);
      return;
    }

    // Check for compromised patterns
    if (checkPasswordCompromised(password)) {
      toast({
        variant: 'destructive',
        title: 'Weak password detected',
        description: 'This password appears to use a common pattern. Please choose a more secure password.',
      });
      setIsLoading(false);
      return;
    }

    // Check if password contains email username
    const emailUsername = email.split('@')[0].toLowerCase();
    if (password.toLowerCase().includes(emailUsername)) {
      toast({
        variant: 'destructive',
        title: 'Password contains email',
        description: 'Your password should not contain parts of your email address.',
      });
      setIsLoading(false);
      return;
    }

    const { error } = await signUp(email, password, fullName);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Account creation failed',
        description: error.message.includes('already registered') 
          ? 'An account with this email already exists. Please try signing in instead.'
          : error.message,
      });
    } else {
      toast({
        title: 'Account created successfully! 🎉',
        description: 'Please check your email to verify your account before signing in.',
      });
    }

    setIsLoading(false);
  };

  const passwordStrength = getPasswordStrength(password);
  const hasCommonPatterns = password ? checkPasswordCompromised(password) : false;

  return (
    <div className="space-y-6">
      <SocialLoginButtons />
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or create account with email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signup-name">Full Name</Label>
          <Input
            id="signup-name"
            name="fullName"
            type="text"
            placeholder="John Doe"
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2"
            autoFocus
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
            name="email"
            type="email"
            placeholder="john@example.com"
            required
            className="transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <div className="relative">
            <Input
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          
          {password && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: `${(passwordRequirements.filter(req => req.test(password)).length / passwordRequirements.length) * 100}%` }}
                  />
                </div>
                <span className={`text-xs font-medium capitalize ${passwordStrength.textColor}`}>
                  {passwordStrength.strength}
                </span>
              </div>

              {hasCommonPatterns && (
                <div className="flex items-center gap-2 p-2 bg-orange-50 border border-orange-200 rounded-md">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  <span className="text-xs text-orange-700">
                    This password uses a common pattern. Consider making it more unique.
                  </span>
                </div>
              )}
              
              <div className="grid grid-cols-1 gap-1 text-xs">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {req.test(password) ? (
                      <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                    ) : (
                      <X className="w-3 h-3 text-gray-400 flex-shrink-0" />
                    )}
                    <span className={req.test(password) ? 'text-green-600' : 'text-gray-500'}>
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          By creating an account, you agree to our{' '}
          <Button variant="link" className="h-auto p-0 text-xs">
            Terms of Service
          </Button>{' '}
          and{' '}
          <Button variant="link" className="h-auto p-0 text-xs">
            Privacy Policy
          </Button>
        </div>

        <Button 
          type="submit" 
          className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]" 
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Account
        </Button>
      </form>
    </div>
  );
};
