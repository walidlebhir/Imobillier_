from fastapi import  HTTPException , status
from fastapi.responses import Response
from src.Models.User import User
from src.Validation.DataRequestDto import RequestUpdatePassword
from src.Security.Authentication.ConfigSecurity import verify_password , hash_password

class Profilcontroller :
    def __init__(self , db ):
        self.database = db


    def getProfilUser(self , userconecter : User  ):
        # recuperation des donnes pour user
        try:
            userProfil = self.database.query(User).filter(User.id == userconecter.id).first()
            return  userProfil
        except Exception as e :
            # debug
            print(f"problemme dans le server {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR ,
                detail=f"Problemme dans le server {e}"
            )

    def UpdatePassword(self ,dataUpdatePassword :RequestUpdatePassword , Userconecter:User ):
        try :
            userUpdatedPasword = self.database.query(User).filter(User.id == Userconecter.id).first()
            # comparaison password actuel avec entrer pas user
            if not  verify_password(dataUpdatePassword.PasswordActuel , userUpdatedPasword.password) :
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND ,
                    detail="password n'est pas verifie "
                )
            HashPassword = hash_password(dataUpdatePassword.NewPassword)
            userUpdatedPasword.password = HashPassword
            self.database.commit()
            self.database.refresh(userUpdatedPasword)

            return Response(
                status_code=status.HTTP_201_CREATED ,
                content="password updated with succes "
            )
        except Exception as e :
            # dbeug
            print(f"problemme dans {e}")
            raise  HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR ,
                detail= f"problemme dans le server {e}"
            )

