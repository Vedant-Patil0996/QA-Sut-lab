from fastapi import APIRouter, Depends, Security, UploadFile, File, HTTPException
from app.auth.jwt import verify_token
import os

router = APIRouter()

@router.post("/upload")
async def upload_document(file: UploadFile = File(...), payload: dict = Security(verify_token)):
    bug_no_validation = os.getenv("BUG_UPLOAD_NO_VALIDATION", "false").lower() == "true"
    
    if not bug_no_validation:
        if not file.filename.endswith('.pdf'):
            raise HTTPException(status_code=400, detail="Only PDF files are allowed")
        
        # Read file to check size
        contents = await file.read()
        if len(contents) > 5 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="File too large")
            
    return {"document_id": "doc-123", "status": "success", "pages": 1}
