import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import SecurityFeatures from './components/SecurityFeatures';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

interface User {
  username: string;
  passwordHash: string;
  salt: string;
  lastPasswordChange: Date;
  passwordHistory: string[];
}

type Page = 'register' | 'login' | 'dashboard';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [registrationStatus, setRegistrationStatus] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [page, setPage] = useState<Page>('login');

  const handleRegistration = (userData: {
    username: string;
    password: string;
    passwordHash: string;
    salt: string;
  }) => {
    const newUser: User = {
      username: userData.username,
      passwordHash: userData.passwordHash,
      salt: userData.salt,
      lastPasswordChange: new Date(),
      passwordHistory: [userData.passwordHash]
    };
    setUsers([...users, newUser]);
    setRegistrationStatus('Account created successfully! You can now log in.');
    setPage('login');
    setTimeout(() => {
      setRegistrationStatus('');
    }, 5000);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setPage('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Secure User Registration System
          </h1>
          <p className="text-lg text-gray-600">
            Implementing Cybersecurity Best Practices
          </p>
        </div>

        {page === 'register' && (
          <>
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <RegistrationForm onSubmit={handleRegistration} users={users} />
              <div className="mt-4 text-center">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setPage('login')}
                >
                  Already have an account? Login
                </button>
              </div>
            </div>
            {registrationStatus && (
              <div className="p-4 rounded-lg mb-6 bg-green-50 border border-green-200 text-green-800">
                {registrationStatus}
              </div>
            )}
            <SecurityFeatures />
          </>
        )}

        {page === 'login' && !currentUser && (
          <>
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <LoginForm users={users} onLogin={handleLogin} />
              <div className="mt-4 text-center">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setPage('register')}
                >
                  Don&apos;t have an account? Register
                </button>
              </div>
            </div>
            {registrationStatus && (
              <div className="p-4 rounded-lg mb-6 bg-green-50 border border-green-200 text-green-800">
                {registrationStatus}
              </div>
            )}
            <SecurityFeatures />
          </>
        )}

        {page === 'dashboard' && currentUser && (
          <Dashboard users={users} currentUser={currentUser} onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}

export default App;
