import { Link } from "react-router-dom";
import RegistrationForm from "../components/RegistrationForm";

interface User {
  username: string;
  passwordHash: string;
  salt: string;
  lastPasswordChange: Date;
  passwordHistory: string[];
}

interface RegisterPageProps {
  users: User[];
  onSubmit: (userData: {
    username: string;
    password: string;
    passwordHash: string;
    salt: string;
  }) => void;
}

function RegisterPage({ users, onSubmit }: RegisterPageProps) {
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
          <RegistrationForm onSubmit={onSubmit} users={users} />
          <div className="mt-4 text-center">
            <Link to="/login" className="text-blue-600 hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
