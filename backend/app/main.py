from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app.models.base import Base
from app.routes import auth, admin
from app.seed import seed_db
import os
from dotenv import load_dotenv

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI(title="QA SUT Lab API")

@app.on_event("startup")
def on_startup():
    seed_db()

origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# ... existing routers ...

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])
app.include_router(admin.router, prefix="/api/tools", tags=["tools"]) # for write_state

from app.routes import chat, documents
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(documents.router, prefix="/api/documents", tags=["documents"])

@app.get("/health")
def health_check():
    return {"status": "ok"}

# Mount the static directory from the Vite build
# We place this at the very end to catch all non-API routes
try:
    app.mount("/assets", StaticFiles(directory="static/assets"), name="assets")
except RuntimeError:
    print("Static assets directory not found. Are you running without a frontend build?")

@app.get("/{full_path:path}")
def catch_all(full_path: str):
    # This acts as the catch-all for React Router so that refreshing a page doesn't return 404
    static_index = os.path.join("static", "index.html")
    if os.path.exists(static_index):
        return FileResponse(static_index)
    return {"error": "Frontend build not found. Run npm run build."}

