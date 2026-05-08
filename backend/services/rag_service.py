from rag.vector_db import load_vector_db
from rag.retriever import retrieve

vectorstore = load_vector_db()


def ask_question(query: str):

    result = retrieve(
        query,
        vectorstore
    )

    return result