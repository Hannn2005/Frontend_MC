import '../App.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const linkClass =
    'px-3 py-2 text-sm font-medium hover:text-mc-green transition';

  const activeClass =
    'px-3 py-2 text-sm font-semibold text-mc-green border-b-2 border-mc-green';

  return (
    <nav className="bg-mc-light shadow-sm">
      <div className="mx-auto max-w-6xl flex items-center justify-between h-14 px-4">
        <div className="text-lg font-semibold">Money Cash</div>
        <div className="flex items-center space-x-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/pengeluaran"
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
          >
            Pengeluaran
          </NavLink>
          <NavLink
            to="/pendapatan"
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
          >
            Pendapatan
          </NavLink>
          <NavLink
            to="/account"
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
          >
            Account
          </NavLink>
         
        </div>
      </div>
    </nav>
  );
}
