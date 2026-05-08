import os

# =========================================
# 📁 BASE PATH (auto-detect project root)
# =========================================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# =========================================
# 📂 DATA PATH (where your documents are)
# =========================================
DATA_PATH = os.path.join(BASE_DIR, "data")

# =========================================
# 🗄️ FAISS INDEX PATH (vector DB storage)
# =========================================
FAISS_INDEX_PATH = os.path.join(BASE_DIR, "faiss_index")

# =========================================
# 🧠 EMBEDDING MODEL (HuggingFace)
# =========================================
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

# =========================================
# ✂️ TEXT SPLITTING CONFIG
# =========================================
CHUNK_SIZE = 500
CHUNK_OVERLAP = 100

# =========================================
# 🔎 RETRIEVAL CONFIG
# =========================================
TOP_K = 3

# =========================================
# 🤖 LLM CONFIG (OPTIONAL - OLLAMA)
# =========================================
USE_OLLAMA = True
OLLAMA_MODEL = "llama3"

# =========================================
# ⚡ DEBUG MODE
# =========================================
DEBUG = True

# =========================================
# 🚀 FASTAPI CONFIG
# =========================================
API_TITLE = "RAG Banking Assistant API"

API_DESCRIPTION = (
    "Grounded RAG Banking Assistant using RBI and SEBI documents"
)

API_VERSION = "1.0.0"

# =========================================
# 🌐 CORS CONFIG
# =========================================
CORS_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

# =========================================
# ✅ ADDED THIS LINE
# =========================================
ALLOWED_ORIGINS = CORS_ORIGINS

# =========================================
# 💬 CHAT HISTORY FILE
# =========================================
CHAT_HISTORY_FILE = "chat_history.json"