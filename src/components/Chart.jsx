import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useEffect, useState } from 'react'
import api from '../utils/api'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function FinancePie() {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    api.get('/transactions/summary')
      .then(res => setSummary(res.data))
      .catch(err => {
        console.error('Pie summary error:', err)
      })
  }, [])

  if (!summary) return <p>Loading chart...</p>

  const data = {
    labels: ['Pendapatan', 'Pengeluaran'],
    datasets: [
      {
        data: [summary.income, summary.expense],
        backgroundColor: ['#89A86E', '#ef4444']
      }
    ]
  }

  return(
    <div className="w-64 h-64 mx-auto my-10">
        <Pie data={data} />
    </div>
   
  ) 
}
