import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-slate-800 p-8 rounded-2xl w-80">
        <h2 className="text-2xl mb-4">Register</h2>
        <input className="w-full p-2 mb-3 bg-slate-700 rounded" placeholder="Name" />
        <input className="w-full p-2 mb-3 bg-slate-700 rounded" placeholder="Email" />
        <input className="w-full p-2 mb-3 bg-slate-700 rounded" placeholder="Password" type="password" />
        <button className="w-full bg-green-600 p-2 rounded">Register</button>
        <Link to="/" className="text-blue-400 text-sm">Back to Login</Link>
      </div>
    </div>
  );
}