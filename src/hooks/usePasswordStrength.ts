import { useState, useEffect } from 'react';

interface PasswordStrength {
  score: number;
  feedback: string[];
  suggestions: string[];
}

export const usePasswordStrength = (password: string): PasswordStrength | null => {
  const [strength, setStrength] = useState<PasswordStrength | null>(null);

  useEffect(() => {
    if (!password) {
      setStrength(null);
      return;
    }

    // Simple password strength calculation without external dependencies
    const calculateStrength = (): PasswordStrength => {
      let score = 0;
      const feedback: string[] = [];
      const suggestions: string[] = [];

      // Length check
      if (password.length >= 8) score++;
      else feedback.push('Password must be at least 8 characters long');

      // Character variety checks
      if (/[A-Z]/.test(password)) score++;
      else feedback.push('Include at least one uppercase letter');

      if (/[a-z]/.test(password)) score++;
      else feedback.push('Include at least one lowercase letter');

      if (/\d/.test(password)) score++;
      else feedback.push('Include at least one number');

      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
      else feedback.push('Include at least one special character');

      // Additional complexity checks
      if (password.length >= 12) score++;
      if (/[A-Z].*[a-z]|[a-z].*[A-Z]/.test(password)) score++;
      if (/\d.*[!@#$%^&*(),.?":{}|<>]|[!@#$%^&*(),.?":{}|<>].*\d/.test(password)) score++;

      // Common patterns to avoid
      if (/123|abc|qwe|password|admin/i.test(password)) {
        score = Math.max(0, score - 2);
        feedback.push('Avoid common patterns and sequences');
        suggestions.push('Use random combinations instead of sequences');
      }

      // Generate suggestions based on score
      if (score < 3) {
        suggestions.push('Use at least 8 characters');
        suggestions.push('Include uppercase and lowercase letters');
        suggestions.push('Add numbers and special characters');
      } else if (score < 5) {
        suggestions.push('Add more complexity');
        suggestions.push('Consider using a passphrase');
      } else if (score < 7) {
        suggestions.push('Consider adding more unique characters');
      }

      return {
        score: Math.min(4, Math.floor(score / 2)), // Normalize to 0-4 scale
        feedback,
        suggestions
      };
    };

    setStrength(calculateStrength());
  }, [password]);

  return strength;
}; 