from fastapi import HTTPException
from Models.User import User 
from fastapi.security import OAuth2PasswordRequestForm
from Validation.AuthDto import RegisterRequest , LoginRequest
from Security.Authentication.ConfigSecurity import Hash_password , Authentication
from Security.Authentication.Jwt_token import create_access_token


class AuthController : 

    def __init__(self , db):
        self.db = db 

    def Register(self , UserRegister : RegisterRequest ) : 

        # verification User exit 
        UserExit = self.db.query(User).filter(User.email == UserRegister.email).first() 
        if UserExit : 
            raise  HTTPException(
                status_code=401 , 
                detail="User exist dans notre systeme"
            )


        # creation des donnes 
        HashPassword = Hash_password(UserRegister.password) 
        NewUser = User(
            Nom = UserRegister.Nom , 
            email = UserRegister.email , 
            password = HashPassword ,
            Role = UserRegister.role.value 
        )

        try : 
            # create logic pour authentication 
            self.db.add(NewUser) 
            self.db.commit()
            self.db.refresh(NewUser) 
            token = create_access_token({"sub" : NewUser.email , "role" : NewUser.Role})
            
            return {
                "token" : token , 
                
            }

        except Exception as E : 
            # debug 
            print(f"Problemme dans le server --> {E}") 
            raise HTTPException(
                status_code=501 , 
                detail= "Erreur server "
            )
    
    def Login(self , dataLogin : LoginRequest ) : 
        userAuth = Authentication(self.db , dataLogin.username , dataLogin.password) 
        if not userAuth : 
            raise HTTPException(
                status_code=401 , 
                detail="Login or password incorect "
            )
        
        token = create_access_token({"sub" : userAuth.email , "role" : userAuth.password})
        return {
            "token" : token
        }
        
