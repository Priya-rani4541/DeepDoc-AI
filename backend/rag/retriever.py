import ollama


def retrieve(query, vectorstore):

    # Retrieve similar chunks
    retrieved_docs = vectorstore.similarity_search_with_score(
        query,
        k=3
    )

    docs = []
    scores = []

    # Filter relevant chunks
    for doc, score in retrieved_docs:

        if score < 1.0:
            docs.append(doc)
            scores.append(score)

    # No relevant documents
    if len(docs) == 0:

        return {
            "answer": "Information not found in retrieved documents.",
            "sources": [],
            "confidence": 0.0
        }

    # Build context
    context = "\n\n".join([
        doc.page_content for doc in docs
    ])

    # Extract sources
    sources = []

    for doc in docs:

        sources.append({
            "document": doc.metadata.get(
                "source",
                "Unknown"
            ),
            "page": doc.metadata.get(
                "page",
                "N/A"
            )
        })

    # Confidence
    avg_score = sum(scores) / len(scores)

    confidence = round(
        max(0, min(1, 1 - avg_score)),
        2
    )

    # Grounded prompt
    prompt = f"""
You are an RBI banking assistant.

STRICT RULES:
1. Answer ONLY from the provided context.
2. Do NOT use outside knowledge.
3. If answer is not present, reply ONLY:
"Information not found in retrieved documents."

Context:
{context}

Question:
{query}
"""

    # Generate response
    response = ollama.chat(
        model="tinyllama",
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

        answer = (
            "Information not found in retrieved documents."
        )

    return {
        "answer": answer,
        "sources": sources,
        "confidence": confidence
    }