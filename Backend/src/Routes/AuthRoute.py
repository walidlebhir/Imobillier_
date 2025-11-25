from fastapi import APIRouter, Depends, HTTPException , status
from fastapi.security import OAuth2PasswordRequestForm
from src.Validation.AuthDto import RegisterRequest , LoginRequest
from sqlalchemy.orm import Session
from src.Config.DB import get_db
from src.Models.User import  User , RoleUser
from src.Security.Middlewares.ProtectRole import require_role
from src.Validation.Dataresponse import UserResponse
from src.Controllers.AuthenticationContoller import AuthController

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


# creation fonction chekAuth --> pour verifie la conexion user
@AuthenticationRoute.get("/chek/auth" , response_model=UserResponse)
async def ChekAuth(CurrentUser : User = Depends(require_role(RoleUser.CLIENT))) :
    try :

        return  CurrentUser
    except Exception as e :
        #debug
        print(f"Problemme dans le server {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR ,
            detail=f"Problemme dans le server {e}"
        )

