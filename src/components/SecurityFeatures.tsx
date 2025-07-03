import React from 'react';

const SecurityFeatures: React.FC = () => {
  const features = [
    'Password strength validation using advanced algorithms',
    'CAPTCHA verification to prevent automated attacks',
    'Password hashing with salt for secure storage',
    'Password reuse prevention',
    'Minimum password requirements (8+ chars, mixed case, numbers, symbols)',
    'Username uniqueness validation',
    'Real-time password strength feedback',
    'Secure password storage with salt',
    'Input validation and sanitization',
    'CSRF protection through CAPTCHA',
    'Rate limiting through CAPTCHA validation',
    'Secure session management'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Security Features Implemented</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center text-green-700">
            <span className="mr-3 text-lg">✅</span>
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityFeatures; 