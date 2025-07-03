import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

interface User {
  username: string;
  passwordHash: string;
  salt: string;
  lastPasswordChange: Date;
  passwordHistory: string[];
}

interface LoginPageProps {
  users: User[];
  onLogin: (user: User) => void;
  registrationStatus: string;
}

function LoginPage({ users, onLogin, registrationStatus }: LoginPageProps) {
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

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <LoginForm users={users} onLogin={onLogin} />
          <div className="mt-4 text-center">
            <Link to="/register" className="text-blue-600 hover:underline">
              Don&apos;t have an account? Register
            </Link>
          </div>
        </div>

        {registrationStatus && (
          <div className="p-4 rounded-lg mb-6 bg-green-50 border border-green-200 text-green-800">
            {registrationStatus}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
