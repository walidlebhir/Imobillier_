from fastapi import HTTPException ,  Depends , status
from fastapi.responses import JSONResponse
from src.Security.Middlewares.ProtectRole import require_role
from src.Models.User import  User
from src.Models.Entreprise import  Entreprise
from src.Validation.GestionaireDto import EntrepriseRequest

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
    

    # fonction recuperation des iformation sur entreprise :
    def InfoEntreprise(self , userConecter : User):

        try:
            # Recuperation des donnes avec filtration des donnes
            EntrepriseData = self.DataBase.query(Entreprise).filter(Entreprise.gestionaireId ==userConecter.id ).first()
            return  EntrepriseData
        except Exception as e :
            # debug
            print(f"Problemme dans le server {e}")
            raise HTTPException(
                status_code=501 ,
                detail= f"Problemme dans le server {e}"
            )
