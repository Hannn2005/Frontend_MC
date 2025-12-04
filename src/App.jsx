// frontend/src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Pengeluaran from './pages/Pengeluaran';
import Pendapatan from './pages/Pendapatan';
import Account from './pages/Account';

function Home() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <Landing />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

     
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pengeluaran" element={<Pengeluaran />} />
        <Route path="/pendapatan" element={<Pendapatan />} />
        <Route path="/account" element={<Account />} />
      </Route>


      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
