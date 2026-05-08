from fastapi import FastAPI
from pydantic import BaseModel

from rag.loader import load_documents
from rag.splitter import split_documents
from rag.vector_db import create_vector_db, load_vector_db
from rag.retriever import retrieve

app = FastAPI()

class QueryRequest(BaseModel):
    query: str

# Global DB
vector_db = None

@app.on_event("startup")
def startup():
    global vector_db

    vector_db = load_vector_db()

    if vector_db is None:
        print("⚡ Creating vector DB...")

        docs = load_documents()
        chunks = split_documents(docs)

        vector_db = create_vector_db(chunks)

        print("✅ Vector DB created!")
    else:
        print("✅ Loaded existing vector DB")

@app.post("/query")
def query_rag(request: QueryRequest):
    result = retrieve(request.query, vector_db)

    return result