from fastapi import APIRouter , Depends
from fastapi.security import OAuth2PasswordRequestForm
from Validation.AuthDto import RegisterRequest
from sqlalchemy.orm import Session 
from Config.DB import get_db

AuthenticationRoute = APIRouter() 


@AuthenticationRoute.post("/Register") 
async def RegesterRoute(DataUserRegister : RegisterRequest ,db:Session = Depends(get_db)) :
    
    pass 


@AuthenticationRoute.post("Login") 
async def Login(form_Data : OAuth2PasswordRequestForm =Depends() ) : 
    pass 