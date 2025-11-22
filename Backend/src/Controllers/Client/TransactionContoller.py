from  uuid import  UUID
from fastapi import  HTTPException , status
from fastapi.responses import  Response
from joblib.testing import raises

from src.Models.Reservation import  Reservation

from src.Models.User import  User
from src.Models.Propritaire import  Proprietaire


class Transactioncontoller :
    def __init__(self , db ):
        self.Database = db

    def HomUser(self):
        # Recuperation de tout les propritaire :
        try:
            propritaireAll =self.Database.query(Proprietaire).all()
            return  propritaireAll
        except Exception as e :
            # dbeuug
            print(f"problemme dans le server {e}")
            raise  HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR ,
                detail=f"problemme dans le servr {e}"
            )


    def Serach(self, villeSearch : str ):
        try:
            ProprietaireSerach = self.Database.query(Proprietaire).filter(Proprietaire.ville.like(f"%{villeSearch}%")).all()
            return  ProprietaireSerach
        except Exception as e :
            # debug
            print(f"problemme dans le server {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR ,
                detail=f"problemme dans le server {e}"
            )

    def ShowOneListing(self , id:UUID ):
        # show seul uuid
        try:
            Propritaire = self.Database.query(Proprietaire).filter(Proprietaire.id == id).first()
            if not  Propritaire :
                raise  HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND ,
                    detail="Proprietire not found "
                )

            return  Propritaire
        except Exception as e :
            # debug
            print(f"Problemme dans le server {e}")
            raise  HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR ,
                detail=f"problemme dans le server {e}"
            )

    def ReservationRendezVous(self , id : UUID , comment:str , UserConecter:User):
         try:
             NewReservation =  Reservation(
                 id_client = UserConecter.id ,
                 Commantaire=comment ,
                 id_proprietaire = id
             )
             self.Database.add(NewReservation)
             self.Database.commit()
             self.refresh(NewReservation)
             return  Response(
                 status_code=status.HTTP_201_CREATED ,
                 content=f"Reservation ajouter avec succes {NewReservation.id} id reservation "
             )
         except Exception as e :
            # debug
            print(f"Problemme dans le server {e}")
            raise  HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR ,
                detail=f"Problemme dans le server "
            )








