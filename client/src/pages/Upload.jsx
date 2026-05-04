import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">
      <div className="bg-white/5 backdrop-blur p-10 rounded-2xl shadow-xl text-center">

        {/* 🔥 Title */}
        <h2 className="text-xl mb-2 font-semibold">
          Upload Documents
        </h2>

        <p className="text-sm opacity-70 mb-4">
          Supports PDF, TXT, DOCX
        </p>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-3"
        />

        {file && (
          <p className="text-green-400 mb-2">
            {file.name}
          </p>
        )}

        <button className="bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-700">
          Upload
        </button>
      </div>
    </div>
  );
}