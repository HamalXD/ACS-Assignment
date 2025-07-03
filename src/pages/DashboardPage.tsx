import Dashboard from "../components/Dashboard";

interface User {
  username: string;
  passwordHash: string;
  salt: string;
  lastPasswordChange: Date;
  passwordHistory: string[];
}

interface DashboardPageProps {
  users: User[];
  currentUser: User;
  onLogout: () => void;
}

function DashboardPage({ users, currentUser, onLogout }: DashboardPageProps) {
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

        <Dashboard
          users={users}
          currentUser={currentUser}
          onLogout={onLogout}
        />
      </div>
    </div>
  );
}

export default DashboardPage;
