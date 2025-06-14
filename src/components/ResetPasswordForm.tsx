
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Eye, EyeOff, Check, X, AlertTriangle } from 'lucide-react';
import { 
  passwordRequirements, 
  getPasswordStrength, 
  validatePasswordSecurity 
} from '@/utils/passwordSecurity';

export const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { updatePassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Passwords do not match',
        description: 'Please make sure both passwords are identical.',
      });
      setIsLoading(false);
      return;
    }

    // Enhanced password validation
    const validation = validatePasswordSecurity(password);
    if (!validation.isValid) {
      toast({
        variant: 'destructive',
        title: 'Password security requirements not met',
        description: validation.errors[0],
      });
      setIsLoading(false);
      return;
    }

    const { error } = await updatePassword(password);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Password update failed',
        description: error.message,
      });
    } else {
      toast({
        title: 'Password updated! 🎉',
        description: 'Your password has been successfully updated.',
      });
      navigate('/');
    }

    setIsLoading(false);
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Set new password</h2>
        <p className="text-muted-foreground">
          Please enter your new password below. Make sure it's secure!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <div className="relative">
            <Input
              id="new-password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2 pr-10"
              autoFocus
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
                    style={{ width: `${(passwordStrength.score / passwordRequirements.length) * 100}%` }}
                  />
                </div>
                <span className={`text-xs font-medium capitalize ${passwordStrength.textColor}`}>
                  {passwordStrength.strength}
                </span>
              </div>
              
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

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          
          {confirmPassword && password !== confirmPassword && (
            <div className="flex items-center gap-2 text-red-600">
              <X className="w-3 h-3" />
              <span className="text-xs">Passwords do not match</span>
            </div>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]" 
          disabled={isLoading || password !== confirmPassword || !password}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update Password
        </Button>
      </form>
    </div>
  );
};
