import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const DEMO_MODE = true;

// 🔥 Highlight keywords
const highlightText = (text) => {
  return text.replace(
    /(interest|loan|RBI)/gi,
    "<mark class='bg-yellow-300 text-black px-1 rounded'>$1</mark>"
  );
};

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      let data;

      if (DEMO_MODE) {
        data = {
          answer:
            "As per RBI guidelines, interest rates must be clearly disclosed for all loan products.",
          sources: [
            { doc: "rbi_guidelines.pdf", confidence: 0.92 },
            { doc: "loan_policy.docx", confidence: 0.88 },
            { doc: "bank_rules.txt", confidence: 0.83 },
          ],
          confidence: 0.89,
        };
        await new Promise((r) => setTimeout(r, 900));
      } else {
        const res = await axios.post("http://localhost:8000/query", null, {
          params: { query: input },
        });
        data = res.data;
      }

      const botMsg = {
        role: "bot",
        text: data.answer,
        sources: data.sources,
        confidence: data.confidence,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Error fetching response" },
      ]);
    }

    setLoading(false);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">

      {/* Sidebar */}
      <div className="hidden md:block w-72 bg-white/5 backdrop-blur-lg border-r border-white/10 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">DeepDoc AI</h2>

        {messages
          .filter((m) => m.role === "user")
          .map((m, i) => (
            <div
              key={i}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition"
            >
              {m.text.slice(0, 30)}...
            </div>
          ))}
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <div className="px-4 py-3 border-b border-white/10 flex justify-between bg-black/30 backdrop-blur">
          <h1 className="font-semibold">DeepDoc AI</h1>
          <span className="text-xs opacity-70">RAG • Sources • Confidence</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {messages.length === 0 && (
            <div className="h-full flex items-center justify-center text-center opacity-70">
              <div>
                <p className="text-lg mb-2">
                  Ask questions about your documents
                </p>
                <p className="text-sm">
                  Upload files and start querying instantly.
                </p>
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-2xl max-w-xl ${
                  msg.role === "user"
                    ? "bg-blue-600"
                    : "bg-white/10 backdrop-blur"
                }`}
              >
                <p
                  dangerouslySetInnerHTML={{
                    __html: highlightText(msg.text),
                  }}
                />

                {/* Sources */}
                {msg.sources && (
                  <div className="mt-3 space-y-2">
                    {msg.sources.map((s, idx) => (
                      <div
                        key={idx}
                        className="bg-white/5 p-2 rounded-lg text-xs flex justify-between"
                      >
                        <span>📄 {s.doc}</span>
                        <span className="text-green-400">
                          {Math.round(s.confidence * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Confidence */}
                {msg.confidence && (
                  <div className="mt-3">
                    <div className="h-2 bg-white/10 rounded">
                      <div
                        className="h-2 bg-green-500 rounded"
                        style={{ width: `${msg.confidence * 100}%` }}
                      />
                    </div>
                    <p className="text-xs mt-1 text-green-400">
                      {Math.round(msg.confidence * 100)}% confidence
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Loading */}
          {loading && (
            <div className="flex gap-2 items-center text-sm opacity-70">
              DeepDoc is thinking
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
          )}

          <div ref={bottomRef}></div>
        </div>

        {/* Input */}
        <div className="p-4 flex gap-2 bg-black/30 backdrop-blur border-t border-white/10">
          <input
            className="flex-1 p-3 rounded-xl bg-white/10 outline-none"
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 px-6 rounded-xl hover:bg-blue-700"
            disabled={!input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}