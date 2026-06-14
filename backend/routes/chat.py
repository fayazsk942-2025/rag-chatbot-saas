from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.chat import Chat
from models.message import Message
from datetime import datetime
import uuid

router = APIRouter(prefix="/chat", tags=["Chat"])

# 🟢 1. Create new chat
@router.post("/new")
def create_chat(user_id: str, db: Session = Depends(get_db)):
    chat = Chat(
        id=uuid.uuid4(),
        user_id=user_id,
        title="New Chat"
    )

    db.add(chat)
    db.commit()
    db.refresh(chat)

    return chat


# 🟢 2. Get all chats
@router.get("/all/{user_id}")
def get_chats(user_id: str, db: Session = Depends(get_db)):
    return db.query(Chat).filter(Chat.user_id == user_id).all()


# 🟢 3. Get messages of a chat
@router.get("/messages/{chat_id}")
def get_messages(chat_id: str, db: Session = Depends(get_db)):
    return db.query(Message).filter(Message.chat_id == chat_id).all()


# 🟢 4. Send message (MAIN RAG ENDPOINT)

@router.post("/send")
def send_message(chat_id: str, message: str, db: Session = Depends(get_db)):

    # 1. Save user message
    user_msg = Message(
        chat_id=chat_id,
        role="user",
        content=message
    )
    db.add(user_msg)

    # 2. 🔥 RAG RESPONSE (THIS IS THE LINE YOU ASKED ABOUT)
    bot_response = rag_answer(
        VECTOR_DB.get("default"),  # vector DB (temporary)
        message,
        fake_llm
    )

    # 3. Save bot message
    bot_msg = Message(
        chat_id=chat_id,
        role="bot",
        content=bot_response
    )
    db.add(bot_msg)

    db.commit()

    return {"response": bot_response}