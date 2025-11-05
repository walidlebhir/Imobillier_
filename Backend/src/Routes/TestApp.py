from fastapi import APIRouter 



AppRoutes = APIRouter() 

@AppRoutes.get("/get/user") 
async def getAllaplication() : 
    return {
        "message" : "all aplication"
    }

