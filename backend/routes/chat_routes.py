from fastapi import APIRouter

from models.request import QueryRequest
from models.response import QueryResponse

from services.rag_service import ask_question
from services.history_service import save_chat

router = APIRouter()


# =====================================
# HEALTH ENDPOINT
# =====================================
@router.get("/health")
def health_check():

    return {
        "status": "healthy"
    }


# =====================================
# ASK ENDPOINT
# =====================================
@router.post("/ask", response_model=QueryResponse)
def ask_question_route(request: QueryRequest):

    result = ask_question(request.query)

    # Save chat history
    save_chat(
        request.query,
        result
    )

    return result