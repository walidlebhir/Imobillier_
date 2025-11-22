from pydantic import  BaseModel
from uuid import  UUID
from decimal import  Decimal
from typing import  Optional
'''
    * Response Entreprise 
    * Response User 
    * Reponse Proprietiare 
    
'''

#entreprise response
class EntrepriseResponse(BaseModel) :
    id :int
    Nom : str
    Description_DT : str
    Location : str

    class Config :
        orm_mode = True

# proprietaire Response
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


# Response User
class UserResponse(BaseModel) :
    id : UUID
    Nom : str
    email : str
    teliphone :Optional[str] = None

    class Config :
        orm_mode = True


