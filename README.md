# DeepDoc AI 🚀

DeepDoc AI is a Retrieval-Augmented Generation (RAG) based intelligent document assistant that enables users to upload documents and interact with them through a modern AI-powered chat interface.

The system uses semantic search, vector embeddings, and TinyLlama-based response generation to provide accurate, context-aware answers from uploaded documents.

---

# ✨ Features

- 📄 Upload and process documents (PDF, TXT, DOCX)
- 💬 Chat-based AI interaction
- 🔍 Semantic search using vector embeddings
- 📚 Top relevant source retrieval
- 📊 Confidence score visualization
- 🎯 Context-aware document question answering
- 🌙 Modern dark ChatGPT-style UI
- ⚡ Fast retrieval using FAISS vector database
- 🤖 TinyLlama-powered local response generation

---

# 🧠 How DeepDoc AI Works

1. User uploads documents
2. Documents are split into smaller chunks
3. Text chunks are converted into embeddings
4. Embeddings are stored in FAISS vector database
5. User asks a question
6. System retrieves the most relevant chunks
7. TinyLlama generates answers using retrieved context
8. Final response includes:
   - AI-generated answer
   - Retrieved sources
   - Confidence score

---

# 🏗 System Architecture

```text
User Query
    ↓
Frontend (React)
    ↓
FastAPI Backend
    ↓
Retriever (FAISS)
    ↓
Relevant Chunks
    ↓
TinyLlama Model (As my system is not supporting ollama but in terminal i used ollama to testcase it is working in the terminal but not working when i connect my project to the frontend ollma is heavy and take more space to work but my system has not that much space)
    ↓
Final Response + Sources + Confidence