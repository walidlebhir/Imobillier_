from pydantic import BaseModel 
from datetime import datetime 


# class dto pour la prediction de prix d'imobilie 
class PredictionDTO(BaseModel) : 
    surface : float 
    bedroom : int 
    bathroom : int 
    city : str 
    proprety_type: str
    address: str 

# classsification dataENtrer 
class ClassificationDTO(BaseModel) : 
    surface : float 
    bedroom : int 
    bathroom : int 
    city : str 
    

class PropmptRequest(BaseModel) : 
    prompt : str  


# Response dataPrediction : 

class PredictionResponse(BaseModel) : 
    id : int 
    surface : float 
    bedroom : int 
    bathroom : int 
    city : str 
    proprety_type: str
    address: str  
    price_predict : float 
    created_at : datetime

    class Config :
        orm_mode = True