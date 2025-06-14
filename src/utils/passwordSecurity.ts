
// Common passwords and patterns to check against
const COMMON_PASSWORDS = [
  'password', '123456', '123456789', 'qwerty', 'abc123', 'password123',
  'admin', 'letmein', 'welcome', 'monkey', '1234567890', 'dragon',
  'sunshine', 'princess', 'football', 'iloveyou', 'superman', 'trustno1',
  'master', 'jordan', 'access', 'flower', 'passw0rd', '1qaz2wsx'
];

export interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

export const passwordRequirements: PasswordRequirement[] = [
  { label: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
  { label: 'Contains uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
  { label: 'Contains lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
  { label: 'Contains number', test: (pwd: string) => /\d/.test(pwd) },
  { label: 'Contains special character', test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
  { label: 'No common words', test: (pwd: string) => !COMMON_PASSWORDS.some(common => pwd.toLowerCase().includes(common.toLowerCase())) },
  { label: 'No repeated characters (3+)', test: (pwd: string) => !/(.)\1{2,}/.test(pwd) },
  { label: 'No sequential numbers', test: (pwd: string) => !/123|234|345|456|567|678|789|890/.test(pwd) }
];

export interface PasswordStrength {
  strength: string;
  color: string;
  textColor: string;
  score: number;
}

export const getPasswordStrength = (password: string): PasswordStrength => {
  const score = passwordRequirements.filter(req => req.test(password)).length;
  
  if (score === 0) return { 
    strength: 'none', 
    color: 'bg-gray-200', 
    textColor: 'text-gray-500',
    score: 0
  };
  if (score <= 2) return { 
    strength: 'very weak', 
    color: 'bg-red-500', 
    textColor: 'text-red-600',
    score: score
  };
  if (score <= 4) return { 
    strength: 'weak', 
    color: 'bg-orange-500', 
    textColor: 'text-orange-600',
    score: score
  };
  if (score <= 6) return { 
    strength: 'fair', 
    color: 'bg-yellow-500', 
    textColor: 'text-yellow-600',
    score: score
  };
  if (score <= 7) return { 
    strength: 'good', 
    color: 'bg-blue-500', 
    textColor: 'text-blue-600',
    score: score
  };
  return { 
    strength: 'strong', 
    color: 'bg-green-500', 
    textColor: 'text-green-600',
    score: score
  };
};

export const checkPasswordCompromised = (password: string): boolean => {
  // Check against common patterns
  const commonPatterns = [
    /^(.)\1+$/, // All same character
    /^(012|123|234|345|456|567|678|789|890|901)+/, // Sequential numbers
    /^(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)+/i, // Sequential letters
    /^[0-9]+$/, // Only numbers
    /^[a-zA-Z]+$/, // Only letters
  ];

  return commonPatterns.some(pattern => pattern.test(password));
};

export const validatePasswordSecurity = (password: string, email?: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  // Check basic requirements
  const failedRequirements = passwordRequirements.filter(req => !req.test(password));
  if (failedRequirements.length > 0) {
    errors.push('Password does not meet all security requirements');
  }

  // Check for compromised patterns
  if (checkPasswordCompromised(password)) {
    errors.push('Password uses a common pattern and may be easily guessed');
  }

  // Check if password contains email username
  if (email) {
    const emailUsername = email.split('@')[0].toLowerCase();
    if (password.toLowerCase().includes(emailUsername)) {
      errors.push('Password should not contain parts of your email address');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Additional security check: entropy calculation
export const calculatePasswordEntropy = (password: string): number => {
  const charSets = [
    { chars: 'abcdefghijklmnopqrstuvwxyz', name: 'lowercase' },
    { chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', name: 'uppercase' },
    { chars: '0123456789', name: 'numbers' },
    { chars: '!@#$%^&*()_+-=[]{}|;:,.<>?', name: 'symbols' }
  ];

  let charSetSize = 0;
  charSets.forEach(set => {
    if (set.chars.split('').some(char => password.includes(char))) {
      charSetSize += set.chars.length;
    }
  });

  return password.length * Math.log2(charSetSize);
};
