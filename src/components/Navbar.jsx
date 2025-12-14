import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import '../App.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass =
    'block px-3 py-2 text-sm font-medium hover:text-mc-green transition'

  const activeClass =
    'block px-3 py-2 text-sm font-semibold text-white bg-mc-green rounded-xl'

  const navItem = (to, label) => (
    <NavLink
      to={to}
      onClick={() => setOpen(false)}
      className={({ isActive }) => (isActive ? activeClass : linkClass)}
    >
      {label}
    </NavLink>
  )

  return (
    <nav className="bg-mc-light shadow-sm">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="text-lg font-semibold">Money Cash</div>

          <div className="hidden md:flex items-center space-x-4">
            {navItem('/dashboard', 'Dashboard')}
            {navItem('/pengeluaran', 'Pengeluaran')}
            {navItem('/pendapatan', 'Pendapatan')}
            {navItem('/account', 'Account')}
          </div>

   
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden rounded p-2 hover:bg-slate-200"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 space-y-1">
            {navItem('/dashboard', 'Dashboard')}
            {navItem('/pengeluaran', 'Pengeluaran')}
            {navItem('/pendapatan', 'Pendapatan')}
            {navItem('/account', 'Account')}
          </div>
        )}
      </div>
    </nav>
  )
}
