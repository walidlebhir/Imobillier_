from fastapi import HTTPException , responses , status
from fastapi.responses import Response
from src.Models.Propritaire import Proprietaire
from src.Validation.GestionaireDto import ProprietaireRequest
from src.Models.User import  User
from src.Models.Entreprise import  Entreprise


# Class Pour manipulation des propritaire

class PropietaireControllers :
    def __init__(self , db ):
        self.database = db

    '''
        * Creat new Proprietaire 
        * update info proprietaire 
        * delete propritaire 
        * show 
        * show all (liste --> pagination ) 
    '''

    def CreateProprietaire(self, UserConnecter : User , dataCreate : ProprietaireRequest):
        try :
            # Recuperation entreprise
            entrepriseData = self.database.query(Entreprise).filter(Entreprise.gestionaireId == UserConnecter.id).first()

            NewPro = Proprietaire(
                titre = dataCreate.titre ,
                type_pro = dataCreate.type_pro ,
                surface = dataCreate.surface ,
                chamber = dataCreate.chamber ,
                ville = dataCreate.ville ,
                code_ville = dataCreate.code_ville ,
                quartie = dataCreate.quartie ,
                prix = dataCreate.prix ,
                description = dataCreate.description ,
                entreprise_id = entrepriseData.id ,
            )

            # crate data
            self.database.add(NewPro)
            self.commit()
            self.refresh(NewPro)

            return  Response(
                status_code=status.HTTP_201_CREATED ,
                content= {
                    "message" : "new propritaire create with succes "
                }
            )
        except Exception as e :
            # debug
            print(f"problemme dans le server {e}")
            raise  HTTPException(
                status_code=501 ,
                detail= f"problemme dans le server {e}"
            )


    def ShowALL(self):
        pass

    def ShowOne(self):
        pass

    def update(self):
        pass


    def delete(self):
        pass
