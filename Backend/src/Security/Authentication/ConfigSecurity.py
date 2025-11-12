from passlib.context import CryptContext 
from sqlalchemy.orm import Session 
from src.Models.User import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# fonction pour hash Password 

def Hash_password(password : str) : 
    safe_password = password.encode('utf-8')[:72].decode('utf-8', 'ignore')
    return pwd_context.hash(safe_password)

#function pour verification de password hashe 

def verificat_password(OriginPassword , hashPassword ) :
    safe_password = OriginPassword.encode('utf-8')[:72].decode('utf-8', 'ignore')
    return pwd_context.verify(safe_password, hashPassword) 


# authentication 


def Authentication(db : Session ,  username : str , password : str ) :
    # recuperation des donnes 
    try : 
        user_auth = db.query(User).filter(User.email == username).first() 
    except Exception as e : 
        # debug 
        print(f"problemme dans le server {e}")

    if not user_auth : 
        return None 
    if not verificat_password(password , user_auth.password) : 
        return None 

    return user_auth 
    
