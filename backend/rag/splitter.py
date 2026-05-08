from config import CHUNK_SIZE, CHUNK_OVERLAP
from rag.loader import Document


def split_documents(documents):

    chunks = []

    for doc in documents:

        text = doc.page_content
        metadata = doc.metadata

        # Clean text
        text = text.replace("\n", " ").strip()

        start = 0

        while start < len(text):

            end = start + CHUNK_SIZE

            # Prevent cutting words abruptly
            if end < len(text):
                while end > start and text[end] != " ":
                    end -= 1

            chunk_text = text[start:end].strip()

            # Skip empty chunks
            if chunk_text:

                chunk_metadata = metadata.copy()

                # Add chunk position info
                chunk_metadata["chunk_start"] = start
                chunk_metadata["chunk_end"] = end

                chunks.append(
                    Document(
                        page_content=chunk_text,
                        metadata=chunk_metadata
                    )
                )

            # Move window with overlap
            start += (CHUNK_SIZE - CHUNK_OVERLAP)

    return chunks