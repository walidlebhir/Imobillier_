from fastapi import Depends , HTTPException 
from Models.User import RoleUser , User
from Security.Middlewares.ProtectRole import require_role 


class ProfilController : 

    def __init__(self , db ):
        self.Database = db 

    def getUserProfil(self , userConcter :User) : 
        return {
            "data" : userConcter
        }
    
