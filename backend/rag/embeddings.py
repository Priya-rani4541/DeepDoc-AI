from sentence_transformers import SentenceTransformer
from config import EMBEDDING_MODEL

class LocalEmbeddings:
    def __init__(self, model_name):
        self.model = SentenceTransformer(model_name)
    
    def embed_documents(self, texts):
        return self.model.encode(texts)
    
    def embed_query(self, text):
        return self.model.encode([text])[0]

def get_embeddings():
    return LocalEmbeddings(EMBEDDING_MODEL)
