from fastapi import APIRouter , Depends
from sqlalchemy.orm import session
from Config.DB import get_db

from Validation.UserDto import UserCreate 
from Controllers.TestController import TestUserContoller 

AppRoutes = APIRouter() 

@AppRoutes.get("/get/user") 
async def getAllaplication() : 
    return {
        "message" : "all aplication"
    }


@AppRoutes.post("/create/newUserTest") 
async def CreteUser(UserRequest : UserCreate , db :session=Depends(get_db) ) : 
    controllerTest = TestUserContoller(db=db) 
    return controllerTest.CreateTestUser(UserRequest) 

