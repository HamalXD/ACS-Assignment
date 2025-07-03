import React, { useState } from "react";

interface User {
  username: string;
  passwordHash: string;
  salt: string;
  lastPasswordChange: Date;
  passwordHistory: string[];
}

interface DashboardProps {
  users: User[];
  currentUser: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  users,
  currentUser,
  onLogout,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"username" | "date">("date");
  const [showPasswords, setShowPasswords] = useState(false);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === "username") {
      return a.username.localeCompare(b.username);
    } else {
      return (
        new Date(b.lastPasswordChange).getTime() -
        new Date(a.lastPasswordChange).getTime()
      );
    }
  });

  const getPasswordStrength = (passwordHash: string): string => {
    // Simple strength estimation based on hash length
    if (passwordHash.length > 30) return "Strong";
    if (passwordHash.length > 20) return "Good";
    if (passwordHash.length > 15) return "Fair";
    return "Weak";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                User Management Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {currentUser.username}!
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Logged in as</div>
                <div className="font-medium text-gray-900">
                  {currentUser.username}
                </div>
              </div>
              <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">🔒</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Strong Passwords
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    users.filter(
                      (u) => getPasswordStrength(u.passwordHash) === "Strong"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <span className="text-2xl">📅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Recent Registrations
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    users.filter((u) => {
                      const daysSince =
                        (Date.now() -
                          new Date(u.lastPasswordChange).getTime()) /
                        (1000 * 60 * 60 * 24);
                      return daysSince <= 7;
                    }).length
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-2xl">🛡️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Security Score
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(
                    (users.filter(
                      (u) => getPasswordStrength(u.passwordHash) === "Strong"
                    ).length /
                      users.length) *
                      100
                  )}
                  %
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Search Users
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by username..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-4 items-end">
              <div>
                <label
                  htmlFor="sort"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Sort By
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "username" | "date")
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="date">Registration Date</option>
                  <option value="username">Username</option>
                </select>
              </div>

              <button
                onClick={() => setShowPasswords(!showPasswords)}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                {showPasswords ? "Hide" : "Show"} Password Hashes
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              User Accounts
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Password Strength
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Password Hash
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salt
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedUsers.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {user.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.username}
                          </div>
                          <div className="text-sm text-gray-500">
                            User ID: {index + 1}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(user.lastPasswordChange).toLocaleDateString()}
                      <div className="text-xs text-gray-500">
                        {new Date(user.lastPasswordChange).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          getPasswordStrength(user.passwordHash) === "Strong"
                            ? "bg-green-100 text-green-800"
                            : getPasswordStrength(user.passwordHash) === "Good"
                            ? "bg-blue-100 text-blue-800"
                            : getPasswordStrength(user.passwordHash) === "Fair"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {getPasswordStrength(user.passwordHash)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {showPasswords ? (
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {user.passwordHash}
                        </code>
                      ) : (
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {user.passwordHash.substring(0, 20)}...
                        </code>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {user.salt.substring(0, 10)}...
                      </code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {sortedUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No users found</div>
              <div className="text-gray-400 text-sm mt-1">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "No users have been registered yet"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
