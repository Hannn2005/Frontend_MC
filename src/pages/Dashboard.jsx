// frontend/src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import api from '../utils/api';
import StatCard from '../components/StatCard';
import { Link } from 'react-router-dom';
import '../App.css'

import image1 from '../assets/up.png'
import image2 from '../assets/down.png'

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const [sRes, rRes] = await Promise.all([
        api.get('/dashboard/summary'),
        api.get('/transactions/recent?limit=5')
      ]);
      setSummary(sRes.data);
      setRecent(rRes.data);
    }
    fetchData().catch(console.error);
  }, []);

  if (!summary) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Dashboard Keuangan</h1>

      
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <StatCard
          label="Total Saldo"
          value={`Rp ${formatNumber(summary.balance)}`}
          img={image1}
        />
        <StatCard
          label="Total Pendapatan"
          value={`Rp ${formatNumber(summary.totalIncome)}`}
          img={image1}
        />
        <StatCard
          label="Total Pengeluaran"
          value={`Rp ${formatNumber(summary.totalExpense)}`}
          accent="bg-red-100"
          img={image2}
        />
      </div>

      <Link to = "/pendapatan">
          <button className="mb-6 mr-3 rounded-lg bg-mc-green px-4 py-2 text-sm font-semibold text-white hover:bg-transparent hover:border border-mc-green hover:text-mc-green transition-all duration-150">
             + Tambah Pendapatan
          </button>
      </Link>
     
      <Link to = "/pengeluaran"> 
          <button className="mb-6 rounded-lg bg-red-400 px-4 py-2 text-sm font-semibold text-white hover:bg-transparent hover:border border-red-400 hover:text-red-400  transition-all duration-150">
            + Tambah Pengeluaran
          </button>
      </Link>
     

    
      <div className="rounded-2xl bg-mc-light p-4">
        <div className="mb-2 text-sm font-semibold">Transaksi Terakhir</div>
        <div className="space-y-2">
          {recent.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between rounded-xl bg-white px-4 py-2 text-sm"
            >
              <div>
                <div className="font-medium">{t.description || t.category}</div>
                <div className="text-xs text-slate-500">
                  {t.type === 'INCOME' ? 'Pendapatan' : 'Pengeluaran'} •{' '}
                  {new Date(t.date).toLocaleDateString('id-ID')}
                </div>
              </div>
              <div
                className={
                  t.type === 'INCOME'
                    ? 'font-semibold text-emerald-500'
                    : 'font-semibold text-red-500'
                }
              >
                {t.type === 'INCOME' ? '+' : '-'} Rp {formatNumber(t.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatNumber(x) {
  return Number(x).toLocaleString('id-ID');
}
