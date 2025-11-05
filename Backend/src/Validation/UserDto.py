from pydantic import BaseModel , EmailStr , Field

# tester la synchronisation de base de donnes 


class UserCreate(BaseModel)  : 
    nom : str = Field(str , min_length=3 , max_length=20 ) 
    email :  EmailStr 
    password : str = Field(str , min_length=3 , max_length=10 ) 
