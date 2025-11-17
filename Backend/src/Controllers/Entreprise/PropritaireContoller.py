from fastapi import HTTPException , responses , status
from fastapi.responses import JSONResponse
from uuid import  UUID
from src.Models.Propritaire import Proprietaire
from src.Models.Entreprise import Entreprise
from src.Validation.GestionaireDto import ProprietaireRequest
from src.Models.User import  User
from cloudinary.uploader import  upload
from src.Models.photo import Photo
from src.Config import  configCloudinary

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

    def CreateProprietaire(self, UserConnecter : User , dataCreate : ProprietaireRequest ):
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

            return  JSONResponse(
                status_code=status.HTTP_201_CREATED ,
                content="proprietaire cree avec succes "
            )
        except Exception as e :
            # debug
            print(f"problemme dans le server {e}")
            raise  HTTPException(
                status_code=501 ,
                detail= f"problemme dans le server {e}"
            )

    def UploadFile(self , id:UUID  , files = None):
        # ---> uplodre file Imgaes dans Cloudinary

        try:
            if files :
                for file in files :
                    Resultatuplode = upload(file.file , folder="proprietaireImages")
                    NewImages =Photo(
                        url = Resultatuplode['secure_url'] ,
                        publicId = Resultatuplode['public_id'] ,
                        proprietaireid = id

                    )
                    # ajoutant dans la base de donnes
                    self.database.add(NewImages)
                self.database.commit()

            return  {
                "message" : "images uplode with succes "
            }
        except Exception as e :
            # dbeug
            print(f"problemme dans le server {e} ")
            raise  HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR ,
                detail=f"problemme dans le server "
            )



    def ShowALL(self):
        # Recuperation des donnes
        try:
            DataProp = self.database.query(Proprietaire).all()
            return  DataProp
        except Exception as e :
            # debug
            print(f"Problemme dans le systme {e}")
            raise HTTPException(
                status_code=501 ,
                detail=f"Problemme dans le server "
            )

    def ShowOne(self , id :int ):
        try:
            One_Prop = self.database.query(Proprietaire).filter(Proprietaire.id == id).first()
            return  One_Prop
        except Exception as Erreur :
            print(f"Problemme dans le server  {Erreur}")
            raise  HTTPException(
                status_code=501 ,
                detail=f"Problemme dans le server {Erreur}"
            )

    def update(self):
        pass


    def delete(self):
        # supresion
        try:
            pass
        except Exception as erreur :
            print(f"Problemme dans le server {erreur}")
            raise HTTPException(
                status_code=501,
                detail= f"Problemme dans le server {erreur}"
            )

    def Search(self , searchData : str):
        # ->> fonctionalite pour efectue search
        try:
            dataSearch = self.database.query(Proprietaire).filter(Proprietaire.titre.like(f"%{searchData}%"))
            if not dataSearch :
                raise  HTTPException(
                    status_code=401 ,
                    detail= "Data not found "
                )

            return  dataSearch
        except Exception as erreur :
            print(f"Problemme dans le server {erreur}")
            raise HTTPException(
                status_code=501 ,
                detail=f"Problemme dans le server {erreur}"
            )