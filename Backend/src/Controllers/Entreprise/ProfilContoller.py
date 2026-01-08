from fastapi import Depends , HTTPException 
from src.Models.User import User , RoleUser




class ProfilController : 

    def __init__(self , db ):
        self.Database = db 

    def getUserProfil(self , userConcter :User) : 
        return {
            "data" : userConcter
        }
    
    def changePassword(self):
        pass

