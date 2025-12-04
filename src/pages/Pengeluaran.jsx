// frontend/src/pages/Pengeluaran.jsx
import { useEffect, useState } from 'react';
import api from '../utils/api';
import '../App.css'

export default function Pengeluaran() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    category: '',
    description: '',
    amount: '',
    date: ''
  });

  const load = async () => {
    const res = await api.get('/transactions/expense');
    setItems(res.data);
  };

  useEffect(() => {
    load().catch(console.error);
  }, []);

  const total = items.reduce((sum, i) => sum + Number(i.amount), 0);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/transactions/expense', {
      ...form,
      amount: Number(form.amount)
    });
    setForm({ category: '', description: '', amount: '', date: '' });
    load();
  };

  const handleDelete = async (id) => {
    await api.delete(`/transactions/${id}`);
    load();
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Tambah Pengeluaran</h1>

      <div className="mb-6 rounded-2xl bg-mc-light px-6 py-4 flex justify-between">
        <div>
          <div className="text-xs text-slate-500">Total Pengeluaran</div>
          <div className="text-xl font-bold text-red-500">
            Rp {total.toLocaleString('id-ID')}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">Jumlah Transaksi</div>
          <div className="text-xl font-bold">{items.length}</div>
        </div>
      </div>

     
      <form
        onSubmit={handleSubmit}
        className="mb-4 grid gap-3 rounded-xl bg-white p-4 shadow-sm md:grid-cols-5"
      >
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="rounded border px-3 py-2 text-sm"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Kategori"
          className="rounded border px-3 py-2 text-sm"
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Deskripsi"
          className="rounded border px-3 py-2 text-sm"
        />
        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="Jumlah"
          className="rounded border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded bg-mc-green px-4 py-2 text-sm font-semibold text-white"
        >
          Simpan
        </button>
      </form>

    
      <div className="rounded-2xl bg-mc-light p-4">
        <table className="w-full text-left text-xs">
          <thead className="text-slate-500">
            <tr>
              <th className="pb-2 text-center">Tanggal</th>
              <th className="pb-2 text-center">Kategori</th>
              <th className="pb-2 text-center">Deskripsi</th>
              <th className="pb-2 text-center">Jumlah</th>
              <th className="pb-2 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {items.map((item, idx) => (
              <tr
                key={item.id}
                className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
              >
                <td className="px-3 py-2 text-center">
                  {new Date(item.date).toLocaleDateString('id-ID')}
                </td>
                <td className="px-3 py-2 text-center">
                  <span className="rounded-full bg-mc-light px-3 py-1 text-[11px]">
                    {item.category}
                  </span>
                </td>
                <td className="px-3 py-2 text-center">{item.description}</td>
                <td className="px-3 py-2 text-center text-red-500">
                  Rp {Number(item.amount).toLocaleString('id-ID')}
                </td>
                <td className="px-3 py-2 text-center">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-[11px] text-red-500 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="px-3 py-4 text-center text-slate-500"
                >
                  Belum ada pengeluaran
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
