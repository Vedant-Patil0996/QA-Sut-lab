from app.database import SessionLocal, engine
from app.models.base import Base
from app.models.user import User
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def seed_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Check if users exist
    if db.query(User).first():
        db.close()
        return

    users = [
        User(email="viewer@lab.local", hashed_password=pwd_context.hash("Viewer123!"), role="viewer", tenant_id="tenant-a"),
        User(email="analyst@lab.local", hashed_password=pwd_context.hash("Analyst123!"), role="analyst", tenant_id="tenant-a"),
        User(email="admin@lab.local", hashed_password=pwd_context.hash("Admin123!"), role="admin", tenant_id="tenant-a"),
    ]
    
    db.add_all(users)
    db.commit()
    db.close()
    print("Database seeded successfully.")

if __name__ == "__main__":
    seed_db()
