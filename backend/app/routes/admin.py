import os
from fastapi import APIRouter, Depends, HTTPException, Security, Request
from app.auth.jwt import verify_token

router = APIRouter()

@router.get("/health")
def admin_health(request: Request, payload: dict = Security(verify_token)):
    # Intentional bug check
    bug_rbac_viewer_admin = os.getenv("BUG_RBAC_VIEWER_ADMIN", "false").lower() == "true"
    
    role = payload.get("role")
    
    if role == "admin":
        return {"status": "healthy", "components": ["db", "api"]}
    elif role == "viewer" and bug_rbac_viewer_admin:
        # Intentional bug: viewer gets admin access
        return {"status": "healthy", "components": ["db", "api"]}
    else:
        raise HTTPException(status_code=403, detail="Forbidden")

@router.post("/tools/write_state")
def write_state(payload: dict = Security(verify_token)):
    role = payload.get("role")
    if role in ["admin", "analyst"]:
        return {"status": "success"}
    else:
        raise HTTPException(status_code=403, detail="Forbidden")
