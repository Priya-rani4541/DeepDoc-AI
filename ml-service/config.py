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
USE_OLLAMA = True     # 👉 set True when you install Ollama
OLLAMA_MODEL = "llama3"

# =========================================
# ⚡ DEBUG MODE
# =========================================
DEBUG = True