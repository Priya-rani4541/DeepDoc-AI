import os
import sys
from rag.loader import load_documents
from rag.splitter import split_documents
from rag.vector_db import create_vector_db, load_vector_db
from rag.retriever import retrieve

def test_rag():
    print("🚀 Starting RAG test...")
    
    # 1. Load docs
    print("📂 Loading documents...")
    docs = load_documents()
    print(f"✅ Loaded {len(docs)} documents.")
    
    # 2. Split docs
    print("✂️ Splitting documents...")
    chunks = split_documents(docs)
    print(f"✅ Created {len(chunks)} chunks.")
    
    # 3. Create/Load Vector DB
    print("🧠 Initializing Vector DB...")
    db = create_vector_db(chunks)
    print("✅ Vector DB ready.")
    
    # 4. Run a query
    query = "Who won IPL 2026?"
    print(f"❓ Querying: {query}")
    result = retrieve(query, db)
    
    # 5. Print results
    print("\n--- RESULT ---")
    import json
    print(json.dumps(result, indent=2))
    print("--------------\n")

if __name__ == "__main__":
    test_rag()
