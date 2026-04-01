import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import { AuthContext } from "./context/AuthContext";

const RequireAuth = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin" || user?.email === "admin@gmail.com";

  if (!user) return <Navigate to="/login" replace />;
  if (requiredRole === "admin" && !isAdmin) return <Navigate to="/dashboard" replace />;

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth requiredRole="user">
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAuth requiredRole="admin">
              <Admin />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;