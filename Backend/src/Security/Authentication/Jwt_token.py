from dotenv import load_dotenv
import os
from datetime import datetime, timedelta
from jose import jwt


load_dotenv()


secret = "MYKey"
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

if secret is None :
    raise ValueError("Problemme dan sle key ")

def create_access_token(dataUser: dict, expires_delta: timedelta | None = None):
    data = dataUser.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    data.update({"exp": expire})
    encoded_jwt = jwt.encode(data, secret, algorithm=ALGORITHM)
    return encoded_jwt
