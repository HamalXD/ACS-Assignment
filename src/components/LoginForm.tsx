import React, { useState } from 'react';
import Captcha from './Captcha';

interface User {
  username: string;
  passwordHash: string;
  salt: string;
  lastPasswordChange: Date;
  passwordHistory: string[];
}

interface LoginFormProps {
  users: User[];
  onLogin: (user: User) => void;
}

function LoginForm({ users, onLogin }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaText, setCaptchaText] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCaptchaGenerated = (captcha: string) => {
    setCaptchaText(captcha);
  };

  const handleCaptchaValidation = () => {
    if (captchaValue.toLowerCase() === captchaText.toLowerCase()) {
      setCaptchaValid(true);
      setErrorMessage('');
    } else {
      setCaptchaValid(false);
      setCaptchaValue('');
      setErrorMessage('CAPTCHA validation failed. Please try again.');
    }
  };

  const hashPassword = (password: string, salt: string): string => {
    // Simple hash function for demo purposes
    // In production, use a proper hashing library like bcrypt
    return btoa(password + salt);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      setErrorMessage('Account is temporarily locked due to too many failed attempts.');
      return;
    }

    if (!captchaValid) {
      setErrorMessage('Please complete CAPTCHA validation first.');
      return;
    }

    // Find user by username
    const user = users.find(u => u.username === username);
    
    if (!user) {
      handleFailedLogin();
      setErrorMessage('Invalid username or password.');
      return;
    }

    // Verify password
    const hashedPassword = hashPassword(password, user.salt);
    
    if (hashedPassword !== user.passwordHash) {
      handleFailedLogin();
      setErrorMessage('Invalid username or password.');
      return;
    }

    // Successful login
    setLoginAttempts(0);
    setIsLocked(false);
    setErrorMessage('');
    onLogin(user);
  };

  const handleFailedLogin = () => {
    const newAttempts = loginAttempts + 1;
    setLoginAttempts(newAttempts);
    
    if (newAttempts >= 3) {
      setIsLocked(true);
      setErrorMessage('Account locked due to too many failed attempts. Please try again later.');
      
      // Unlock after 5 minutes
      setTimeout(() => {
        setIsLocked(false);
        setLoginAttempts(0);
        setErrorMessage('');
      }, 5 * 60 * 1000);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="loginUsername" className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            id="loginUsername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLocked}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 disabled:opacity-50"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="loginPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLocked}
              className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 disabled:opacity-50"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLocked}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
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
                disabled={isLocked}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={handleCaptchaValidation}
                disabled={isLocked}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 whitespace-nowrap disabled:opacity-50"
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

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg">
            {errorMessage}
          </div>
        )}

        {loginAttempts > 0 && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg">
            Failed login attempts: {loginAttempts}/3
            {isLocked && <div className="mt-1 text-sm">Account locked for 5 minutes.</div>}
          </div>
        )}

        <button 
          type="submit" 
          disabled={!captchaValid || isLocked}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLocked ? 'Account Locked' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm; 