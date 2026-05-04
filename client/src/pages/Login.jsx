// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// export default function Login() {
//   return (
//     <div className="flex items-center justify-center h-screen">
//       <motion.div 
//         initial={{ opacity: 0 }} 
//         animate={{ opacity: 1 }}
//         className="bg-slate-800 p-8 rounded-2xl shadow-xl w-80"
//       >
//         <h2 className="text-2xl font-bold mb-4">DeepDoc AI</h2>
//         <input className="w-full p-2 mb-3 bg-slate-700 rounded" placeholder="Email" />
//         <input className="w-full p-2 mb-3 bg-slate-700 rounded" placeholder="Password" type="password" />
//         <button className="w-full bg-blue-600 p-2 rounded">Login</button>
//         <p className="mt-3 text-sm">
//           No account? <Link to="/register" className="text-blue-400">Register</Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email & password");
      return;
    }

    // 🔥 DEMO LOGIN (no backend)
    if (email === "test@gmail.com" && password === "123456") {
      navigate("/chat"); // go to chat page
    } else {
      alert("Invalid credentials (use test@gmail.com / 123456)");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      <div className="bg-white/5 backdrop-blur p-8 rounded-2xl w-80 shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">DeepDoc AI</h2>

        <input
          className="w-full p-2 mb-3 bg-slate-700 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 mb-3 bg-slate-700 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <p className="mt-3 text-sm text-center">
          No account?{" "}
          <Link to="/register" className="text-blue-400">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}