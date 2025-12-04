import '../App.css'
export default function StatCard({ label, value, img }) {
  return (
    <div className="rounded-xl bg-white shadow-sm">
      <div className="p-4 flex items-center space-x-4">
        <img className="h-10 w-10 rounded-lg" src = {img} ></img>
        <div>
          <div className="text-xs text-slate-500">{label}</div>
          <div className="text-lg font-semibold">{value}</div>
        </div>
      </div>
    </div>
  );
}
