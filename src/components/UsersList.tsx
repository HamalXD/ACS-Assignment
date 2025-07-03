import React from "react";

interface User {
  username: string;
  passwordHash: string;
  salt: string;
  lastPasswordChange: Date;
  passwordHistory: string[];
}

interface UsersListProps {
  users: User[];
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
  if (users.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Registered Users ({users.length})
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-lg border border-gray-200"
          >
            <div className="space-y-2">
              <div>
                <strong className="text-gray-700">Username:</strong>{" "}
                {user.username}
              </div>
              <div>
                <strong className="text-gray-700">Registered:</strong>{" "}
                {user.lastPasswordChange.toLocaleDateString()}
              </div>
              <div>
                <strong className="text-gray-700">Password Hash:</strong>
                <code className="text-xs bg-gray-200 px-1 rounded ml-1">
                  {user.passwordHash.substring(0, 20)}...
                </code>
              </div>
              <div>
                <strong className="text-gray-700">Salt:</strong>
                <code className="text-xs bg-gray-200 px-1 rounded ml-1">
                  {user.salt.substring(0, 10)}...
                </code>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
