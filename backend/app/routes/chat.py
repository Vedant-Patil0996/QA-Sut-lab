from fastapi import APIRouter, Depends, Security
from pydantic import BaseModel
from app.auth.jwt import verify_token
import os

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("")
def chat(request: ChatRequest, payload: dict = Security(verify_token)):
    # Intentional bug check: BUG_REFLECT_INJECTION
    # In a real app we'd sanitize it. Here we mock LLM completion
    return {"reply": f"Received: {request.message}. I am a stub LLM."}

@router.get("/history")
def get_history(payload: dict = Security(verify_token)):
    return {"history": []}
