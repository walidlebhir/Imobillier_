from fastapi import APIRouter , Depends , HTTPException 
from sqlalchemy.orm import Session 
from src.Config.DB import get_db 
from src.Validation.AIRequestDTO import PredictionDTO
from src.Models.User import RoleUser 
from src.Validation.AIRequestDTO import ClassificationDTO
from src.Controllers.Entreprise.AIController import aiControler
from src.Security.Middlewares.ProtectConection import get_current_User
from src.Security.Middlewares.ProtectRole import require_role 
from src.Models.User import User 
from src.Validation.AIRequestDTO import PropmptRequest

from typing import List 
from src.Validation.AIRequestDTO import PredictionResponse

aiRoutes = APIRouter() 



@aiRoutes.post("/prediction/price") 
async def predictPriceRoute(datapredict : PredictionDTO ,  db:Session = Depends(get_db) , userconecter : User = Depends(require_role(RoleUser.GESTIONAIRE)) ) : 
    controllerAI = aiControler(db) 
    return controllerAI.PredictionData(datapredict , userconecter)

@aiRoutes.post("/classification/propritie")
async def classPrediction(dataclassification : ClassificationDTO , db :Session = Depends(get_db)) : 
    controllerai = aiControler(db) 
    return controllerai.ClassificationType(dataclassification)


# recherche sementique 
@aiRoutes.post("/search/sementique") 
async def serachSementiqueRoute(promptrequest_user : PropmptRequest , db:Session = Depends(get_db)) : 
    controllerai = aiControler(db) 
    return controllerai.SerchSimentic(promptrequest_user) 



@aiRoutes.get("/get/prediction/data" , response_model=List[PredictionResponse]) 
async def getPredictionData(userConecter : User = Depends(require_role(RoleUser.GESTIONAIRE)) , db :Session = Depends(get_db)) : 
    controllerAi = aiControler(db) 
    return controllerAi.getPrediction(userConecter) 
