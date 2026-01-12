from pydantic import BaseModel , Field , EmailStr 
from src.Models.User import RoleUser

class RegisterRequest(BaseModel) : 
    Nom : str = Field(str , min_length=4 , max_length=20) 
    email : EmailStr 
    password : str 
    role : RoleUser


class LoginRequest(BaseModel) : 
    username : EmailStr 
    password : str = Field(min_length=6 , max_length=128)


