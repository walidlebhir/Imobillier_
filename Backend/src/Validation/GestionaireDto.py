
from pydantic import BaseModel , Field
from  decimal import  Decimal
from typing import  List

# Request Entreprise : 
class EntrepriseRequest(BaseModel) : 
    Nom : str = Field(... , min_length=4 , max_length=40) 
    Description_DT : str = Field(... , min_length=5 , max_length=100) 
    Location : str 

    class Config:
        allow_population_by_field_name = True



# Class Pour image Proprietaire
class ImageCreate(BaseModel) :
    url : str
    publicId : str


class ProprietaireRequest(BaseModel) :
    titre : str = Field(... , min_length=2 , max_length=50)
    type_pro : str
    surface :Decimal
    chamber : int
    ville : str
    code_ville : str
    quartie : str
    prix : float
    description : str








