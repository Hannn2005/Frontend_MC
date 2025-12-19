import { useEffect, useState } from 'react'
import api from '../utils/api'
import '../App.css'
import { NumericFormat } from "react-number-format";


export default function Pendapatan() {
  const [items, setItems] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [showEdit, setShowEdit] = useState(false)

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    category: '',
    description: '',
    amount: '',
    date: ''
  })

  //load data
  const load = async () => {
    try {
      setLoading(true)

      const res = await api.get('/transactions/income', {
        params: { startDate, endDate }
      })

      setItems(res.data)
    } catch (err) {
      console.error(err)
      alert('Gagal memuat data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setSubmitting(true)

      await api.post('/transactions/income', {
        ...form,
        amount: Number(form.amount)
      })

      alert('Pendapatan berhasil ditambahkan')
      setForm({ category: '', description: '', amount: '', date: '' })
      load()
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menyimpan')
    } finally {
      setSubmitting(false)
    }
  }

  
  const handleEdit = (item) => {
    setEditingId(item.id)
    setForm({
      category: item.category,
      description: item.description,
      amount: item.amount,
      date: item.date?.slice(0, 10)
    })
    setShowEdit(true)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      setSubmitting(true)

      await api.put(`/transactions/${editingId}`, {
        ...form,
        amount: Number(form.amount)
      })

      alert('Pendapatan berhasil diupdate')
      closeModal()
      load()
    } catch (err) {
      alert('Gagal update')
    } finally {
      setSubmitting(false)
    }
  }


  const handleDeleteFromEdit = async () => {
    const ok = window.confirm('Yakin ingin menghapus pendapatan ini?')
    if (!ok) return

    try {
      setSubmitting(true)

      await api.delete(`/transactions/${editingId}`)
      alert('Pendapatan berhasil dihapus')
      closeModal()
      load()
    } catch (err) {
      alert('Gagal menghapus')
    } finally {
      setSubmitting(false)
    }
  }

  const closeModal = () => {
    setShowEdit(false)
    setEditingId(null)
    setForm({ category: '', description: '', amount: '', date: '' })
  }

  const total = items.reduce((sum, i) => sum + Number(i.amount), 0)


  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Pendapatan</h1>

      
      <div className="mb-4 flex flex-wrap gap-3 items-center">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="rounded border px-3 py-2 text-sm"
        />
        <span>-</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="rounded border px-3 py-2 text-sm"
        />
        <button
          onClick={load}
          disabled={loading}
          className="rounded bg-mc-green px-4 py-2 text-sm text-white disabled:opacity-50 hover:bg-transparent hover:border border-mc-green hover:text-mc-green transition-all duration-200"
        >
          {loading ? 'Memuat...' : 'Filter'}
        </button>
      </div>

      
      <div className="mb-6 rounded-2xl bg-mc-light px-6 py-4 flex justify-between">
        <div>
          <div className="text-xs text-slate-500">Total Pendapatan</div>
          <div className="text-xl font-bold text-emerald-500">
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
        className="mb-6 grid gap-3 rounded-xl bg-white p-4 shadow-sm md:grid-cols-5"
      >
        <input name="category" value={form.category} onChange={handleChange} placeholder="Judul" className="rounded border px-3 py-2 text-sm" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Deskripsi" className="rounded border px-3 py-2 text-sm" />
        <NumericFormat
            name="amount"
            value={form.amount}
            thousandSeparator="."
            decimalSeparator=","
            prefix="Rp "
            allowNegative={false}
            placeholder="Rp 0"
            onValueChange={(values) => {
              setForm({
                ...form,
                amount: values.value, 
              });
            }}
            className="rounded border px-3 py-2 text-sm"
          />
        <input name="date" type="date" value={form.date} onChange={handleChange} className="rounded border px-3 py-2 text-sm" />

        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-mc-green px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 hover:bg-transparent hover:border border-mc-green hover:text-mc-green transition-all duration-200"
        >
          {submitting ? 'Menyimpan...' : 'Simpan'}
        </button>
      </form>

    
      <div className="space-y-3 rounded-2xl bg-mc-light p-4">
        {loading && (
          <div className="text-center text-sm text-slate-500 py-6">
            Memuat data...
          </div>
        )}

        {!loading &&
          items.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-lg">
              <div>
                <div className="font-semibold">{item.category}</div>
                <div className="text-xs text-slate-500">
                  {item.description} • {new Date(item.date).toLocaleDateString('id-ID')}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="font-semibold text-emerald-500">
                  Rp {Number(item.amount).toLocaleString('id-ID')}
                </div>

                <button
                  onClick={() => handleEdit(item)}
                  className="rounded-xl bg-blue-100 px-3 py-1 text-sm text-blue-600 hover:bg-blue-500 hover:text-white"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}

        {!loading && items.length === 0 && (
          <div className="text-center text-xs text-slate-500">
            Belum ada pendapatan
          </div>
        )}
      </div>

      {/* popup update */}

      {showEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">Edit Pendapatan</h2>

            <form onSubmit={handleUpdate} className="space-y-3">
              <input name="category" value={form.category} onChange={handleChange} className="w-full rounded border px-3 py-2 text-sm" />
              <input name="description" value={form.description} onChange={handleChange} className="w-full rounded border px-3 py-2 text-sm" />
               <NumericFormat
                  name="amount"
                  value={form.amount}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix="Rp "
                  allowNegative={false}
                  placeholder="Rp 0"
                  onValueChange={(values) => {
                    setForm({
                      ...form,
                      amount: values.value, 
                    });
                  }}
                  className="w-full rounded border px-3 py-2 text-sm"
              />
              <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full rounded border px-3 py-2 text-sm" />

              <div className="flex justify-between items-center pt-4">
                <button
                  type="button"
                  onClick={handleDeleteFromEdit}
                  disabled={submitting}
                  className="rounded bg-red-100 px-4 py-2 text-sm font-semibold text-red-600 disabled:opacity-50"
                >
                  {submitting ? 'Menghapus...' : 'Hapus'}
                </button>

                <div className="flex gap-2">
                  <button type="button" onClick={closeModal} className="rounded px-4 py-2 text-sm text-slate-500 hover:bg-slate-100">
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded bg-mc-green px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                  >
                    {submitting ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
