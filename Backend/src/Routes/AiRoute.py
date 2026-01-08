from fastapi import APIRouter , Depends , HTTPException 
from sqlalchemy.orm import Session 
from src.Config.DB import get_db 
from src.Validation.AIRequestDTO import PredictionDTO

from src.Validation.AIRequestDTO import ClassificationDTO
from src.Controllers.Entreprise.AIController import aiControler
from src.Security.Middlewares.ProtectConection import get_current_User
from src.Security.Middlewares.ProtectRole import require_role 
from src.Models.User import User 

aiRoutes = APIRouter() 



@aiRoutes.post("/prediction/price") 
async def predictPriceRoute(datapredict : PredictionDTO ,  db:Session = Depends(get_db) ) : 
    controllerAI = aiControler(db) 
    return controllerAI.PredictionData(datapredict )

@aiRoutes.post("/classification/propritie")
async def classPrediction(dataclassification : ClassificationDTO , db :Session = Depends(get_db)) : 
    controllerai = aiControler(db) 
    return controllerai.ClassificationType(dataclassification)

    