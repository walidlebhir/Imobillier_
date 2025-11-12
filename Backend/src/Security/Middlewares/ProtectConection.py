from fastapi import HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from src.Config.DB import get_db
from datetime import datetime
from dotenv import load_dotenv
from src.Models.User import User
import os

load_dotenv()

SECRE_KEY = os.getenv("SECRE_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

oauth2_schema = OAuth2PasswordBearer(tokenUrl="token")

def get_current_User(token: str = Depends(oauth2_schema), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRE_KEY, algorithms=[ALGORITHM])
        userName: str = payload.get("sub")
        if userName is None:
            raise credentials_exception
        exp = payload.get("exp")
        if exp and datetime.utcfromtimestamp(exp) < datetime.utcnow():
            raise HTTPException(status_code=401, detail="Token expired")
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.email == userName).first()
    if not user:
        raise credentials_exception

    return user
