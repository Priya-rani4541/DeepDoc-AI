from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from routes.chat_routes import router

from config import (
    API_TITLE,
    API_VERSION,
    ALLOWED_ORIGINS
)

from rag.vector_db import load_vector_db

import logging

# =====================================
# LOGGING CONFIG
# =====================================
logging.basicConfig(level=logging.INFO)

logger = logging.getLogger(__name__)

# =====================================
# CREATE FASTAPI APP
# =====================================
app = FastAPI(
    title=API_TITLE,
    version=API_VERSION
)

# =====================================
# GLOBAL VECTORSTORE
# =====================================
vectorstore = None

# =====================================
# STARTUP EVENT
# =====================================
@app.on_event("startup")
def startup_event():

    global vectorstore

    logger.info("Loading FAISS vector database...")

    vectorstore = load_vector_db()

    logger.info("Vector database loaded successfully.")

# =====================================
# ADD CORS
# =====================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =====================================
# GLOBAL ERROR HANDLER
# =====================================
@app.exception_handler(Exception)
async def global_exception_handler(request, exc):

    logger.error(f"Unhandled Error: {exc}")

    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Server Error",
            "message": str(exc)
        }
    )

# =====================================
# INCLUDE ROUTES
# =====================================
app.include_router(router)