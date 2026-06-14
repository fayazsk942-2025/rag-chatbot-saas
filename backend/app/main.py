from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import engine, Base
from app.api.auth import router as auth_router
from app.models.user import User

# Create tables (dev only — later use Alembic)
Base.metadata.create_all(bind=engine)

app = FastAPI()

# ✅ CORS FIX (IMPORTANT for Next.js frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)

@app.get("/")
def home():
    return {"message": "Backend Running"}

from routes.chat import router as chat_router

app.include_router(chat_router)


from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict to Vercel URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)