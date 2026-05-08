import os
import faiss
import numpy as np
import pickle

from config import FAISS_INDEX_PATH
from rag.embeddings import get_embeddings


class LocalVectorDB:

    def __init__(self, index, metadata):
        self.index = index
        self.metadata = metadata
        self.embeddings_model = get_embeddings()

    # =====================================
    # SIMILARITY SEARCH WITH SCORE
    # =====================================
    def similarity_search_with_score(self, query, k=5):

        # Convert query into embedding
        query_vector = self.embeddings_model.embed_query(query)

        query_vector = np.array([query_vector]).astype("float32")

        # Search FAISS
        distances, indices = self.index.search(query_vector, k)

        results = []

        for dist, idx in zip(distances[0], indices[0]):

            # Skip invalid indices
            if idx >= len(self.metadata):
                continue

            # =====================================
            # SIMILARITY THRESHOLD FILTER
            # Lower distance = better match
            # =====================================
            if dist > 1.5:
                continue

            doc = self.metadata[idx]

            results.append((doc, float(dist)))

        return results

    # =====================================
    # SAVE FAISS DATABASE
    # =====================================
    def save_local(self, folder_path):

        if not os.path.exists(folder_path):
            os.makedirs(folder_path)

        faiss.write_index(
            self.index,
            os.path.join(folder_path, "index.faiss")
        )

        with open(
            os.path.join(folder_path, "metadata.pkl"),
            "wb"
        ) as f:
            pickle.dump(self.metadata, f)


# =====================================
# CREATE VECTOR DATABASE
# =====================================
def create_vector_db(chunks):

    embeddings_model = get_embeddings()

    texts = [chunk.page_content for chunk in chunks]

    # Generate embeddings
    vectors = embeddings_model.embed_documents(texts)

    vectors = np.array(vectors).astype("float32")

    # Create FAISS index
    dimension = vectors.shape[1]

    index = faiss.IndexFlatL2(dimension)

    index.add(vectors)

    # Create DB object
    db = LocalVectorDB(index, chunks)

    # Save locally
    db.save_local(FAISS_INDEX_PATH)

    return db


# =====================================
# LOAD VECTOR DATABASE
# =====================================
def load_vector_db():

    index_path = os.path.join(
        FAISS_INDEX_PATH,
        "index.faiss"
    )

    metadata_path = os.path.join(
        FAISS_INDEX_PATH,
        "metadata.pkl"
    )

    # Check files exist
    if not os.path.exists(index_path):
        return None

    if not os.path.exists(metadata_path):
        return None

    # Load FAISS index
    index = faiss.read_index(index_path)

    # Load metadata
    with open(metadata_path, "rb") as f:
        metadata = pickle.load(f)

    return LocalVectorDB(index, metadata)