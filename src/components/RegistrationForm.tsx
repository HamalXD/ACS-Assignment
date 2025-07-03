import React, { useState } from "react";
import PasswordStrength from "./PasswordStrength";
import Captcha from "./Captcha";
import { usePasswordStrength } from "../hooks/usePasswordStrength";
import { usePasswordValidation } from "../hooks/usePasswordValidation";

interface RegistrationFormProps {
  onSubmit: (userData: {
    username: string;
    password: string;
    passwordHash: string;
    salt: string;
  }) => void;
  users: Array<{ username: string; passwordHistory: string[] }>;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  users,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false);

  const passwordStrength = usePasswordStrength(password);
  const { isPasswordValid, isPasswordReused } = usePasswordValidation(
    password,
    users
  );

  const handleCaptchaGenerated = (captcha: string) => {
    setCaptchaText(captcha);
  };

  const handleCaptchaValidation = () => {
    if (captchaValue.toLowerCase() === captchaText.toLowerCase()) {
      setCaptchaValid(true);
    } else {
      setCaptchaValid(false);
      setCaptchaValue("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaValid) {
      alert("Please complete CAPTCHA validation first.");
      return;
    }

    if (!isPasswordValid) {
      alert("Password does not meet security requirements.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (isPasswordReused) {
      alert(
        "Password has been used before. Please choose a different password."
      );
      return;
    }

    if (users.some((user) => user.username === username)) {
      alert("Username already exists. Please choose a different username.");
      return;
    }

    // Generate salt and hash password
    const salt = generateSalt();
    const passwordHash = hashPassword(password, salt);

    onSubmit({
      username,
      password,
      passwordHash,
      salt,
    });

    // Reset form
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setCaptchaValue("");
    setCaptchaValid(false);
  };

  const generateSalt = (): string => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  const hashPassword = (password: string, salt: string): string => {
    // Simple hash function for demo purposes
    // In production, use a proper hashing library like bcrypt
    return btoa(password + salt);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={3}
          maxLength={20}
          pattern="[a-zA-Z0-9_]+"
          title="Username must be 3-20 characters, letters, numbers, and underscores only"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          placeholder="Enter your username"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>

        <PasswordStrength strength={passwordStrength} />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          placeholder="Confirm your password"
        />
        {confirmPassword && password !== confirmPassword && (
          <div className="mt-2 text-sm text-red-600 flex items-center">
            <span className="mr-2">⚠️</span> Passwords do not match
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          CAPTCHA Verification
        </label>
        <div className="space-y-3">
          <Captcha onGenerate={handleCaptchaGenerated} />
          <div className="flex gap-3">
            <input
              type="text"
              value={captchaValue}
              onChange={(e) => setCaptchaValue(e.target.value)}
              placeholder="Enter CAPTCHA"
              required
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
            <button
              type="button"
              onClick={handleCaptchaValidation}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 whitespace-nowrap"
            >
              Validate CAPTCHA
            </button>
          </div>
          {captchaValid && (
            <div className="text-sm text-green-600 flex items-center">
              <span className="mr-2">✅</span> CAPTCHA validated successfully!
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        disabled={
          !captchaValid || !isPasswordValid || password !== confirmPassword
        }
      >
        Create Account
      </button>
    </form>
  );
};

export default RegistrationForm;
