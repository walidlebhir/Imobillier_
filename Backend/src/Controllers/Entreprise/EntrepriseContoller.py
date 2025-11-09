from fastapi import HTTPException ,  Depends , status
from fastapi.responses import JSONResponse
from Security.Middlewares.ProtectRole import require_role 
from Models.User import User
from Models.Entreprise import Entreprise 
from Models.User import RoleUser
from Validation.GestionaireDto import EntrepriseRequest

class EntrepriseContollers : 
    def __init__(self , db ):
        self.DataBase = db  

    # fonction Pour creation des information sur ENtreprise 
    def CreateEntreprise(self , UserConection : User , EntreAdd :EntrepriseRequest ) :

        print(EntreAdd.dict())
        try :
            id_gestionaire = UserConection.id 
            NewEntreprise = Entreprise(

                Nom = EntreAdd.Nom , 
                Description_DT = EntreAdd.Description_DT , 
                Location = EntreAdd.Location , 
                gestionaireId = id_gestionaire 
            )

            # ajouter dans db 
            self.DataBase.add(NewEntreprise) 
            self.DataBase.commit() 
            self.DataBase.refresh(NewEntreprise) 

            return JSONResponse(
                status_code=status.HTTP_201_CREATED , 
                content= {
                    "message" : "Entreprise Ajouter "
                }
            )
        except Exception as E : 
            # debug 
            print(f"Problemme dans le server -> {E} ")
            raise HTTPException(
                status_code=501 , 
                detail="Problemme dans le server "
            )
    
    def getEntrep(self) : 
        pass 

    