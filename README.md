# DeepDoc AI 🚀

DeepDoc AI is a full-stack AI-powered Retrieval-Augmented Generation (RAG) chatbot system designed for intelligent document understanding in the banking and finance domain.

The platform allows users to upload documents, perform semantic search, and receive grounded AI-generated responses with citations and confidence scores using a lightweight local LLM powered by TinyLlama.

---

# 🌟 Features

## 📄 Intelligent Document Processing
- Upload and process:
  - PDF
  - TXT
  - DOCX
- Semantic chunking and embedding generation
- FAISS vector database integration

---

## 🤖 AI-Powered Banking Assistant
- Grounded RAG-based responses
- Local LLM integration using TinyLlama
- Banking & finance-focused chatbot
- Context-aware AI answers

---

## 💬 Modern Chat Interface
- ChatGPT-style dark UI
- User & assistant chat bubbles
- Confidence score visualization
- Top 3 source retrieval
- Highlight matched keywords
- Smooth loading animations
- Scrollable chat history

---

# 🧠 How It Works

1. Users upload documents
2. Documents are converted into embeddings
3. Embeddings are stored in FAISS vector database
4. User queries are embedded and matched semantically
5. Top relevant chunks are retrieved
6. TinyLlama generates grounded responses
7. System returns:
   - AI-generated answer
   - Source citations
   - Confidence score

---

# 🏗 Architecture


React Frontend
       ↓
FastAPI Backend
       ↓
FAISS Vector Store
       ↓
TinyLlama Local LLM


# 🛠 Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- Framer Motion

---

## Backend
- FastAPI
- Uvicorn

---

## AI / ML
- LangChain
- FAISS
- Sentence Transformers
- TinyLlama
- HuggingFace Transformers

---

# 📂 Project Structure


DeepDoc_AI/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── pages/
│   │   └── styles/
│   │
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── rag/
│   │   ├── loader.py
│   │   ├── splitter.py
│   │   ├── embeddings.py
│   │   ├── retriever.py
│   │   └── vector_db.py
│   │
│   ├── data/
│   ├── uploads/
│   ├── main.py
│   ├── config.py
│   └── requirements.txt
│
├── screenshots/
│
└── README.md




# 📸 Screenshots

## 💬 Chat Interface
![Chat](screenshots/chat.png)

---

## 🤖 AI Response
![Answer](screenshots/answer.png)

---

## 📊 Confidence Score
![Confidence](screenshots/confidence.png)

---

## 📂 Upload Documents
![Upload](screenshots/upload.png)

---

# 🚀 Installation & Setup

# 1️⃣ Clone Repository


git clone https://github.com/YOUR_USERNAME/DeepDoc-AI.git


# 2️⃣ Frontend Setup


cd frontend
npm install
npm start

Frontend runs on:

http://localhost:3000/chat


# 3️⃣ Backend Setup


cd backend

Create virtual environment:

python -m venv venv

Activate virtual environment:

### Windows


.\venv\Scripts\activate


Install dependencies:

```bash
pip install -r requirements.txt
```

Run backend:

```bash
uvicorn main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

---

# 4️⃣ Install TinyLlama

Install required package:

```bash
pip install transformers accelerate torch
```

TinyLlama will automatically download during first execution.

---

# 📡 API Endpoint

## Ask Question

```http
POST /ask
```

---

## Request Example

```json
{
  "query": "What are RBI transparency rules?"
}
```

---

## Response Example

```json
{
  "answer": "RBI requires lenders to clearly disclose all loan charges.",
  "sources": [
    {
      "document": "rbi_guidelines.pdf",
      "page": 2
    }
  ],
  "confidence": 0.91
}
```

---

# 🧪 Example Test Queries

```text
What is RBI?

What are RBI transparency rules?

Explain loan eligibility criteria.

Is prepayment allowed?

Are hidden charges allowed?
```

---

# 🚀 Current Capabilities

✔ Semantic document search  
✔ Grounded AI responses  
✔ FAISS vector retrieval  
✔ Local lightweight LLM inference  
✔ Confidence scoring  
✔ Source citation retrieval  
✔ Modern responsive frontend  

---

# 🚀 Why TinyLlama?

TinyLlama is used because:
- Lightweight and faster
- Requires less RAM
- Better for low-end systems
- Easier local deployment
- Suitable for educational RAG systems

---

# 🚀 Future Improvements

- MongoDB integration
- User authentication
- Chat history persistence
- Streaming AI responses
- Multi-document conversations
- Agentic RAG workflows
- Cloud deployment
- GPU inference optimization

---

# 👩‍💻 Author

Priya Rani

---

# ⭐ Acknowledgements

- LangChain
- HuggingFace
- FAISS
- FastAPI
- React
- TinyLlama

---

# 📜 License

This project is developed for educational, research, and AI engineering purposes.
