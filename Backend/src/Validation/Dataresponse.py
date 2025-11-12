from pydantic import  BaseModel
from uuid import  UUID
from decimal import  Decimal
'''
    * Response Entreprise 
    * Response User 
    * Reponse Proprietiare 
    
'''

class EntrepriseResponse(BaseModel) :
    id :int
    Nom : str
    Description_DT : str
    Location : str

    class Config :
        orm_mode = True


class ProprietaireResponse(BaseModel) :
    id :UUID
    titre : str
    type_pro : str
    surface : Decimal
    chamber : int
    ville : str
    code_ville : str
    quartie : str
    prix : Decimal
    description : str
    entreprise_id : int


