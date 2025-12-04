import { useEffect, useState } from 'react';
import api from '../utils/api';
import '../App.css'

export default function Pendapatan() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    category: '',
    description: '',
    amount: '',
    date: ''
  });

  const load = async () => {
    const res = await api.get('/transactions/income');
    setItems(res.data);
  };

  useEffect(() => {
    load().catch(console.error);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/transactions/income', {
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

  const total = items.reduce((sum, i) => sum + Number(i.amount), 0);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Tambah Pendapatan</h1>

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <div className="text-xl text-slate-500">Total Pendapatan</div>
          <div className="text-xl font-bold text-emerald-500">
            Rp {total.toLocaleString('id-ID')}
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 shadow-sm">
          <div className="text-xl text-slate-500">Pendapatan Bulan Ini</div>
      
          <div className="text-xl font-bold text-emerald-500">
            Rp {total.toLocaleString('id-ID')}
          </div>
        </div>
      </div>

     

  
      <form
        onSubmit={handleSubmit}
        className="mb-6 gap-3 rounded-xl bg-white p-4 shadow-sm flex flex-row justify-center items-center"
      >
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Kategori (Gaji, Freelance...)"
          className="rounded border px-3 py-2 text-xl"
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Deskripsi"
          className="rounded border px-3 py-2 text-xl"
        />
        <input
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Jumlah"
          type="number"
          className="rounded border px-3 py-2 text-xl"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="rounded border px-3 py-2 text-xl"
        />
        <button
          type="submit"
          className="rounded bg-mc-green px-5 py-2 text-xl font-semibold text-white md:col-span-4
          hover:bg-transparent hover:border border-mc-green hover:text-mc-green transition-all duration-150
          "
        >
          Simpan
        </button>
      </form>

      <div className="space-y-3 rounded-2xl bg-mc-light p-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm"
          >
            <div>
              <div className="font-semibold">{item.category}</div>
              <div className="text-xs text-slate-500">
                {item.description} •{' '}
                {new Date(item.date).toLocaleDateString('id-ID')}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="font-semibold text-emerald-500">
                Rp {Number(item.amount).toLocaleString('id-ID')}
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-xs text-red-500 hover:underline"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center text-xs text-slate-500">
            Belum ada pendapatan
          </div>
        )}
      </div>
    </div>
  );
}
