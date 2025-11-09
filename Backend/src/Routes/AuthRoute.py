from fastapi import APIRouter , Depends
from fastapi.security import OAuth2PasswordRequestForm
from Validation.AuthDto import RegisterRequest , LoginRequest
from sqlalchemy.orm import Session 
from Config.DB import get_db


from Controllers.AuthenticationContoller import AuthController

AuthenticationRoute = APIRouter() 


@AuthenticationRoute.post("/Register") 
async def RegesterRoute(DataUserRegister : RegisterRequest ,db:Session = Depends(get_db)) :
    # injection de dependance 
    controller_Auth = AuthController(db) 
    return controller_Auth.Register(DataUserRegister)



@AuthenticationRoute.post("/Login") 
async def Login(form_Data :LoginRequest  , db:Session = Depends(get_db) ) : 
    Contoller_auth = AuthController(db) 
    return Contoller_auth.Login(form_Data) 


