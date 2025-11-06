
from datetime import datetime , timedelta
from  jose import jwt , JWTError 
import secrets 

from dotenv import load_dotenv 
import os 


load_dotenv() 

SECRE_KEY=os.getenv("SECRE_KEY")
ALGORITHM="ALGORITHM"
ACCESS_TOKEN_EXPIRE_MINUTES= os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES") 



# generation Json web token 

def create_acces_Token(dataUser : dict , expires_delta : timedelta | None=None) : 
    
    # creation une token de type JWT 
    Data_encode = dataUser.copy() 
    if expires_delta : 
        # creation une temp d'expirete de login jwt dans cookies 
        expires = datetime.utcnow()+expires_delta()
    else : 
        # si ona pas du temp prend par defaul 15 minut 
        expires = datetime.utcnow()+expires_delta(minute = 15 )

    Data_encode.update({"exp" : expires}) 
    encode_Jwt = jwt.encode(Data_encode , SECRE_KEY , algorithm=ALGORITHM)

    return encode_Jwt 
