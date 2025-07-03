import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";

interface User {
  username: string;
  passwordHash: string;
  salt: string;
  lastPasswordChange: Date;
  passwordHistory: string[];
}

function AppContent() {
  const [users, setUsers] = useState<User[]>([]);
  const [registrationStatus, setRegistrationStatus] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Load users from localStorage on component mount
  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  // Save users to localStorage whenever users state changes
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

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
      passwordHistory: [userData.passwordHash],
    };
    setUsers([...users, newUser]);
    setRegistrationStatus("Account created successfully! You can now log in.");
    navigate("/login");
    setTimeout(() => {
      setRegistrationStatus("");
    }, 5000);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <LoginPage
            users={users}
            onLogin={handleLogin}
            registrationStatus={registrationStatus}
          />
        }
      />
      <Route
        path="/register"
        element={<RegisterPage users={users} onSubmit={handleRegistration} />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute currentUser={currentUser}>
            <DashboardPage
              users={users}
              currentUser={currentUser!}
              onLogout={handleLogout}
            />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
