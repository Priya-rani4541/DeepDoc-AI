import ollama

def retrieve(query, vectorstore):

    # Retrieve top matching chunks with similarity scores
    retrieved_docs = vectorstore.similarity_search_with_score(
        query,
        k=3
    )

    docs = []
    scores = []

    # Filter relevant chunks only
    for doc, score in retrieved_docs:

        # Lower score = better match
        if score < 1.0:
            docs.append(doc)
            scores.append(score)

    # If no relevant chunks found
    if len(docs) == 0:
        return {
            "answer": "Information not found in retrieved documents.",
            "sources": [],
            "confidence": 0.0
        }

    # Combine retrieved chunks into context
    context = "\n\n".join([
        doc.page_content for doc in docs
    ])

    # Debugging: print retrieved context
    print("\n===== RETRIEVED CONTEXT =====\n")

    for doc in docs:
        print(doc.page_content)
        print("\n=============================\n")

    # Extract sources
    sources = []

    for doc in docs:

        source = doc.metadata.get("source", "Unknown")
        page = doc.metadata.get("page", "N/A")

        sources.append({
            "document": source,
            "page": page
        })

    # Better confidence calculation
    avg_score = sum(scores) / len(scores)

    confidence = round(
        max(0, min(1, 1 - avg_score)),
        2
    )

    # Strict grounded prompt
    prompt = prompt = f"""
You are an RBI banking assistant.

STRICT RULES:
1. Answer ONLY from the provided context.
2. Do NOT use outside knowledge.
3. Do NOT combine unrelated chunks.
4. If answer is not fully available in context, reply ONLY:
"Information not found in retrieved documents."

5. Give concise factual answers only.

Context:
{context}

Question:
{query}
"""

    # Generate grounded answer using Ollama
    response = ollama.chat(
    model="llama3",
    messages=[
        {
            "role": "user",
            "content": prompt
        }
    ],
    options={
        "temperature": 0
    }
)

    answer = response["message"]["content"].strip()

    # Safety fallback
    if not answer:
        answer = "Information not found in retrieved documents."

    # Final response
    return {
        "answer": answer,
        "sources": sources,
        "confidence": confidence
    }