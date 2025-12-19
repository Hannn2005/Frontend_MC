import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css'
import image1 from '../assets/shield.png'
import image2 from '../assets/phone.png'
import image3 from '../assets/up2.png'
import image4 from '../assets/data.png'


export default function Landing() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-mc-light" >
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-10 lg:flex-row">
        <div className="flex-1">
          <div className="mb-6 flex items-center space-x-2">
            <div className="h-9 w-9 rounded-lg bg-mc-green text-white flex justify-center items-center font-bold">MC</div>
            <span className="text-xl font-semibold">Money Cash</span>
          </div>
            <h1 style={{ animationDelay: "0s" }} className="animate-fade-in-up text-5xl font-bold text-slate-800 leading-relaxed font-Noto">Kelola <span className="bg-mc-green p-3 text-white rounded-2xl">Keuangan</span> Pribadi dengan Mudah
            </h1>
            <p style={{ animationDelay: "0.15s" }} className="animate-fade-in-up mb-10 text-slate-600 mt-5 text-2xl font-Noto animate-fade-in-up">
              Pantau pendapatan dan pengeluaran Anda dalam satu platform yang
              sederhana, modern, dan mudah digunakan.
            </p>
          <div style={{ animationDelay: "0.3s" }} className="animate-fade-in-up flex space-x-4" >
            <Link
              to="/register"
              className="rounded-full bg-mc-green px-6 py-2 text-xl font-semibold text-white hover:opacity-90 hover:bg-transparent hover:border border-mc-green hover:text-mc-green transition-all duration-200"
            >
              Mulai Sekarang
            </Link>
            <Link
              to="/login"
              className="rounded-full border border-mc-green px-6 py-2 text-xl font-semibold text-mc-green hover:bg-mc-green hover:text-white transition-all duration-200"
            >
              Login
            </Link>
          </div>

        </div>

      <div style={{ animationDelay: "0.4s" }} className='animate-fade-in-up'>
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
      </div>


          <div className="flex flex-col justify-center items-center gap-8">
              <h1 style={{ animationDelay: "0.6s" }} className='animate-fade-in-up font-bold text-3xl text-white bg-mc-green p-5 rounded-2xl font-Noto'>Kenapa Kami ?</h1>
              <div className="flex flex-col justify-center gap-8 lg:flex-row">
                  <Feature title="Aman & Privat" desc="Data terenkripsi dan aman" img = {image1}/>
                  <Feature title="Responsive" desc="Akses di laptop & smartphone" img = {image2}/>
                  <Feature title="Laporan Detail" desc="Tracking pengeluaran lengkap" img = {image3}/>
                  <Feature title="Visualisasi Data" desc="Pie chart interaktif" img = {image4}/>
              </div>
                 
          </div>
    </div>
  );
}

function Feature({ title, desc, img }) {
  return (
    <div
      className="
        rounded-2xl bg-white p-8 shadow-sm
        flex flex-col justify-center items-center
        transition-all duration-300 ease-in-out
        hover:-translate-y-3 hover:shadow-xl
        hover:bg-mc-green group cursor-pointer
        animate-fade-in-up
      "
    >
      <img
        src={img}
        className="mb-4 transition-transform duration-300 group-hover:scale-110"
      />

      <div className="text-xl font-semibold text-slate-800 group-hover:text-white">
        {title}
      </div>

      <div className="text-xs text-slate-500 group-hover:text-white/80 mt-1">
        {desc}
      </div>
    </div>
  );
}

