from sqlalchemy.orm import session 
from fastapi import Depends  , HTTPException 
from fastapi.responses import JSONResponse 

from Validation.UserDto import UserCreate 
from Models.User import User 


class TestUserContoller : 
    def __init__(self  ,db ):
        self.db = db
    
    def CreateTestUser(self , DataCreate : UserCreate ) : 
        try: 
            # creation new User 
            NewUser = User(
                Nom = DataCreate.nom , 
                email = DataCreate.email , 
                password = DataCreate.password 
            )

            self.db.add(NewUser) 
            self.db.commit() 
            self.db.refresh(NewUser) 

            return {
                "message": "User create with succes "
            }
        except Exception as e  : 
            # debug 
            print(f"Problemme {e}")
            raise HTTPException(
                status_code=501 , 
                detail= "Problemme dans le server"
            )
