from fastapi import HTTPException
from src.Models.User import User
from src.Validation.AuthDto import RegisterRequest , LoginRequest
from src.Security.Authentication.ConfigSecurity import hash_password , authenticate
from src.Security.Authentication.Jwt_token import create_access_token


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
        HashPassword = hash_password(UserRegister.password) 
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
                "role" : NewUser.Role, 
                "name" : NewUser.Nom 
            }

        except Exception as E : 
            # debug 
            print(f"Problemme dans le server --> {E}") 
            raise HTTPException(
                status_code=501 , 
                detail= "Erreur server "
            )


    def Login(self , dataLogin : LoginRequest ) : 
        userAuth = authenticate(self.db , dataLogin.username , dataLogin.password) 
        if not userAuth : 
            raise HTTPException(
                status_code=401 , 
                detail="Login or password incorect "
            )
        
        token = create_access_token({"sub" : userAuth.email , "role" : userAuth.Role})
        return {
            "token" : token , 
            "role" : userAuth.Role 
        }
        
