import { useMemo } from "react";

interface User {
  username: string;
  passwordHistory: string[];
}

export const usePasswordValidation = (password: string, users: User[]) => {
  const validation = useMemo(() => {
    if (!password) {
      return {
        isPasswordValid: false,
        isPasswordReused: false,
        errors: [],
      };
    }

    const errors: string[] = [];

    // Check minimum requirements
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Include at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Include at least one lowercase letter");
    }
    if (!/\d/.test(password)) {
      errors.push("Include at least one number");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Include at least one special character");
    }

    // Check for common patterns
    if (/123|abc|qwe|password|admin/i.test(password)) {
      errors.push("Avoid common patterns and sequences");
    }

    // Check password reuse
    const passwordHash = btoa(password); // Simple hash for demo
    const isPasswordReused = users.some((user) =>
      user.passwordHistory.includes(passwordHash)
    );

    if (isPasswordReused) {
      errors.push("Password has been used before");
    }

    const isPasswordValid = errors.length === 0 && password.length >= 8;

    return {
      isPasswordValid,
      isPasswordReused,
      errors,
    };
  }, [password, users]);

  return validation;
};
