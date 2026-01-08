from pydantic import BaseModel 



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
    
