import '../App.css'
import api from '../utils/api'
import { useAuth } from '../context/AuthContext'

export default function Account() {
  const { user, logout } = useAuth()

  const handleDeleteAccount = async () => {
    const ok = window.confirm(
      'Semua data (pendapatan & pengeluaran) akan dihapus permanen.\n\nYakin ingin menghapus akun?'
    )

    if (!ok) return

    try {
      await api.delete('/auth/me')
      alert('Account berhasil dihapus')
      logout() 
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus account')
    }
  }

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

      <div className="mt-8 flex gap-3">
      
        <button
          onClick={logout}
          className="rounded-lg bg-mc-green px-6 py-2 text-sm font-semibold text-white
          hover:bg-transparent hover:border border-mc-green hover:text-mc-green transition-all duration-200"
        >
          Logout
        </button>

       
        <button
          onClick={handleDeleteAccount}
          className="rounded-lg bg-red-500 px-6 py-2 text-sm font-semibold text-white
          hover:bg-transparent hover:border border-red-500 hover:text-red-500 transition-all duration-200"
        >
          Hapus Account
        </button>
      </div>
    </div>
  )
}
