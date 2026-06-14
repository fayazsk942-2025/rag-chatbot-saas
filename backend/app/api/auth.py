from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin

from app.utils.security import hash_password, verify_password
from app.auth.auth_handler import create_access_token
from app.auth.dependencies import get_current_user

router = APIRouter()
@router.post("/register")
def register_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
#uvicorn app.main:app --reload
    existing_user = db.query(User).filter(
        (User.username == user.username) |
        (User.email == user.email)
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Username or Email already exists"
        )

    new_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        username=user.username,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully"
    }

@router.post("/login")
def login_user(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    db_user = db.query(User).filter(
        (User.username == user.username) |
        (User.email == user.username)
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or email"
        )

    if not verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    token = create_access_token({
        "sub": db_user.username,
        "user_id": db_user.id
    })

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.get("/profile")
def get_profile(
    current_user=Depends(get_current_user)
):
    return {
        "id": current_user.id,
        "first_name": current_user.first_name,
        "last_name": current_user.last_name,
        "username": current_user.username,
        "email": current_user.email,
        "profile_photo": current_user.profile_photo
    }

@router.get("/test-token")
def test_token(authorization: str = Header(None)):
    return {
        "token": authorization
    }

