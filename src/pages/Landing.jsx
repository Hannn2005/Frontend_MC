// frontend/src/pages/Landing.jsx
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css'
import image1 from '../assets/shield.png'
import image2 from '../assets/phone.png'
import image3 from '../assets/up2.png'

export default function Landing() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-mc-light">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-10 lg:flex-row">
        <div className="flex-1">
          <div className="mb-6 flex items-center space-x-2">
            <div className="h-9 w-9 rounded-lg bg-mc-green text-white flex justify-center items-center font-bold">MC</div>
            <span className="text-xl font-semibold">Money Cash</span>
          </div>
            <h1 className=" text-5xl font-bold text-slate-800 leading-relaxed font-Noto">
              Kelola <span className='bg-mc-green p-3 text-white rounded-2xl'>Keuangan</span> Pribadi dengan Mudah
            </h1>
            <p className="mb-10 text-slate-600 mt-5 text-2xl font-Noto">
              Pantau pendapatan dan pengeluaran Anda dalam satu platform yang
              sederhana, modern, dan mudah digunakan.
            </p>
          <div className="flex space-x-4">
            <Link
              to="/register"
              className="rounded-full bg-mc-green px-6 py-2 text-xl font-semibold text-white hover:opacity-90"
            >
              Mulai Sekarang
            </Link>
            <Link
              to="/login"
              className="rounded-full border border-mc-green px-6 py-2 text-xl font-semibold text-mc-green hover:bg-white"
            >
              Login
            </Link>
          </div>

        </div>

        
        <div className="flex flex-col flex-1 justify-center">
          <div className="rounded-3xl bg-white p-10 shadow-md">
            <div className="mb-4 text-xl text-slate-500">Total Saldo</div>
            <div className="mb-4 text-2xl font-bold">Rp 5.000.000</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-mc-light p-3">
                <div className="text-xl text-slate-500">Pendapatan</div>
                <div className="font-semibold text-mc-green text-xl">Rp 6.000.000</div>
              </div>
              <div className="rounded-xl bg-red-50 p-3">
                <div className="text-xl text-slate-500">Pengeluaran</div>
                <div className="font-semibold text-red-500 text-xl">Rp 1.000.000</div>
              </div>
            </div>
          </div>
        </div>
      </div>


          <div className="flex flex-col justify-center items-center gap-8">
              <h1 className='font-bold text-5xl text-white bg-mc-green p-5 rounded-2xl font-Noto'>Kenapa Kami</h1>
              <div className="flex flex-row justify-center gap-8">
                  <Feature title="Aman & Privat" desc="Data terenkripsi dan aman" img = {image1}/>
                  <Feature title="Responsive" desc="Akses di laptop & smartphone" img = {image2}/>
                  <Feature title="Laporan Detail" desc="Tracking pengeluaran lengkap" img = {image3}/>
              </div>
                 
          </div>
    </div>
  );
}

function Feature({ title, desc ,img}) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm flex flex-col justify-center items-center">
      <img src = {img}></img>
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-xs text-slate-500">{desc}</div>
    </div>
  );
}
