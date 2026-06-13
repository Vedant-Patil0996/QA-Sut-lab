from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app.database import get_db
from app.models.user import User
from app.auth.jwt import create_access_token

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class LoginRequest(BaseModel):
    email: str | None = None
    password: str | None = None
    role: str | None = None

@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    if request.role and not request.password:
        # Mock RBAC compat
        user = db.query(User).filter(User.role == request.role).first()
        if not user:
            raise HTTPException(status_code=400, detail="Role not found")
    elif request.email and request.password:
        user = db.query(User).filter(User.email == request.email).first()
        if not user or not pwd_context.verify(request.password, user.hashed_password):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    else:
        raise HTTPException(status_code=400, detail="Invalid login request")

    access_token = create_access_token(
        data={"sub": user.id, "role": user.role, "tenant_id": user.tenant_id, "instance_id": "agent-instance-001"}
    )
    return {"access_token": access_token, "role": user.role, "tenant_id": user.tenant_id}
