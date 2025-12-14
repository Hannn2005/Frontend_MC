import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import api from '../utils/api'
import { useAuth } from '../context/AuthContext'
import '../App.css'

export default function Register() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirm: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirm) {
      setError('Password tidak sama')
      return
    }

    try {
      setLoading(true)

      const res = await api.post('/auth/register', {
        username: form.username,
        email: form.email,
        password: form.password
      })

      login(res.data)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal registrasi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-mc-green">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-10 text-center text-7xl font-semibold text-mc-green font-Noto">
          Sign In
        </h2>

        {error && (
          <div className="mb-4 rounded bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-xl">Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded border px-3 py-2 text-sm disabled:bg-slate-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-xl">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded border px-3 py-2 text-sm disabled:bg-slate-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-xl">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded border px-3 py-2 text-sm disabled:bg-slate-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-xl">Confirm Password</label>
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded border px-3 py-2 text-sm disabled:bg-slate-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-mc-green py-2 text-2xl font-semibold text-white
            hover:bg-transparent hover:border border-mc-green hover:text-mc-green
            transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading && (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            )}
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-500">
          Sudah punya akun?{' '}
          <Link to="/login" className="font-semibold text-mc-green">
            login di sini
          </Link>
        </p>

        <p className="mt-4 text-center text-xs text-slate-500">
          <Link to="/" className="font-semibold text-mc-green">
            Kembali ke beranda
          </Link>
        </p>
      </div>
    </div>
  )
}
