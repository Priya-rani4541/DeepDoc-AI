import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { askQuestion } from "../services/api";

// 🔥 Highlight keywords
const highlightText = (text) => {
  if (!text) return "";

  return text.replace(
    /(interest|loan|RBI|SEBI|compliance)/gi,
    "<mark class='bg-yellow-300 text-black px-1 rounded'>$1</mark>"
  );
};

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "👋 Welcome to DeepDoc AI. Ask anything about RBI rules, banking policies, loans, or compliance documents.",
      confidence: 1,
      sources: [],
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // 🔥 Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // 🔥 Send Message
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const query = input;

    const userMsg = {
      role: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);

    setInput("");
    setLoading(true);

    try {
      // 🔥 REAL BACKEND CALL
      const data = await askQuestion(query);

      const botMsg = {
        role: "bot",
        text: data.answer || "No response generated.",
        sources: data.sources || [],
        confidence: data.confidence || 0,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);

      let errorMessage = "⚠️ Backend unavailable.";

      if (error.code === "ECONNABORTED") {
        errorMessage = "⚠️ Request timeout.";
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: errorMessage,
          confidence: 0,
          sources: [],
        },
      ]);
    }

    setLoading(false);
  };

  // 🔥 Clear Chat
  const clearChat = () => {
    setMessages([
      {
        role: "bot",
        text: "👋 Chat cleared. Ask a new banking question.",
        confidence: 1,
        sources: [],
      },
    ]);
  };

  // 🔥 Confidence Color
  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.8) return "bg-green-500";
    if (confidence >= 0.5) return "bg-yellow-500";

    return "bg-red-500";
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white">

      {/* Sidebar */}
      <div className="hidden md:flex md:w-72 flex-col bg-white/5 backdrop-blur-lg border-r border-white/10 p-4 overflow-y-auto">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            DeepDoc AI
          </h2>

          <button
            onClick={clearChat}
            className="text-xs bg-red-500/20 hover:bg-red-500/30 px-2 py-1 rounded"
          >
            Clear
          </button>
        </div>

        <div className="space-y-2">
          {messages
            .filter((m) => m.role === "user")
            .map((m, i) => (
              <div
                key={i}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition text-sm"
              >
                {m.text.slice(0, 40)}...
              </div>
            ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <div className="px-4 py-3 border-b border-white/10 flex justify-between bg-black/30 backdrop-blur">
          <h1 className="font-semibold text-lg">
            Banking RAG Assistant
          </h1>

          <span className="text-xs opacity-70">
            FAISS • Ollama • RAG
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-3 rounded-2xl shadow-lg max-w-2xl ${
                  msg.role === "user"
                    ? "bg-blue-600"
                    : "bg-white/10 backdrop-blur border border-white/10"
                }`}
              >
                {/* Text */}
                <p
                  className="leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: highlightText(msg.text),
                  }}
                />

                {/* Sources */}
                {msg.sources?.length > 0 && (
                  <div className="mt-4 space-y-2">

                    <p className="text-xs opacity-70 uppercase tracking-wide">
                      Top Sources
                    </p>

                    {msg.sources.map((s, idx) => (
                      <div
                        key={idx}
                        className="bg-black/20 border border-white/10 p-2 rounded-lg text-xs"
                      >
                        <div className="flex justify-between">
                          <span>
                            📄 {s.document || s.doc}
                          </span>

                          <span className="text-blue-300">
                            Page {s.page || "-"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Confidence */}
                {msg.role === "bot" && (
                  <div className="mt-4">

                    <div className="flex justify-between text-xs mb-1">
                      <span>Confidence</span>

                      <span>
                        {Math.round(msg.confidence * 100)}%
                      </span>
                    </div>

                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${getConfidenceColor(
                          msg.confidence
                        )}`}
                        style={{
                          width: `${msg.confidence * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Loading */}
          {loading && (
            <div className="flex items-center gap-2 text-sm opacity-70">

              <span>DeepDoc AI is thinking</span>

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
            className="flex-1 p-3 rounded-xl bg-white/10 outline-none border border-white/10 focus:border-blue-500"
            placeholder="Ask about RBI rules, loans, compliance..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && sendMessage()
            }
          />

          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="bg-blue-600 px-6 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}