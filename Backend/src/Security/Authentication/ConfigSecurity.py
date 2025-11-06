from passlib.context import CryptContext 
from sqlalchemy.orm import session 
from Models.User import User 
from ConfigSecurity import verificat_password 

pwd_context = CryptContext(schemes=["bcrypt"] ,  deprecated="auto")

# fonction pour hash Password 

def Hash_password(password) : 
    return pwd_context.hash(password) 

#function pour verification de password hashe 

def verificat_password(OriginPassword , hashPassword ) :
    
    return pwd_context.verify(OriginPassword , hashPassword) 


# authentication 

def Authentication(db : session ,  username : str , password : str ) :
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
    
