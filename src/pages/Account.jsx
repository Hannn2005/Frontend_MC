import '../App.css'
import { useAuth } from '../context/AuthContext';

export default function Account() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Account</h1>
      <div className="rounded-2xl bg-mc-light p-6 shadow-sm">
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-slate-500">Username : </span>
            <span className="font-medium">{user?.username}</span>
          </div>
          <div>
            <span className="text-slate-500">Email : </span>
            <span className="font-medium">{user?.email}</span>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <button
          onClick={logout}
          className="rounded-lg bg-mc-green px-6 py-2 text-sm font-semibold text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
