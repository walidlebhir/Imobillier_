from src.Models.User import  User , RoleUser
from fastapi import  APIRouter , Depends
from uuid import  UUID
from sqlalchemy.orm import  Session
from src.Config.DB import get_db
from src.Security.Middlewares.ProtectRole import  require_role
from src.Controllers.Client.ProfilContoller import Profilcontroller
from src.Controllers.Client.TransactionContoller import Transactioncontoller
from src.Validation.Dataresponse import UserResponse
from src.Validation.DataRequestDto import RequestUpdatePassword
from src.Validation.Dataresponse import ProprietaireResponse
from typing import  List
ClientRoutes = APIRouter()

# Gestion des profils :

@ClientRoutes.get("/get/profil" , response_model=UserResponse)
async  def ProfilUserr(currentUser : User = Depends(require_role(RoleUser.CLIENT)) ,
                       db :Session = Depends(get_db)
                       ) :

    # injection de dependance
    ContollerUser = Profilcontroller(db)
    return  ContollerUser.getProfilUser(currentUser)


@ClientRoutes.patch("/update/password")
async def UpdateProfil(
                passwordUpdateData : RequestUpdatePassword ,
                db : Session = Depends(get_db) ,
                cuurentUser : User = Depends(require_role(RoleUser.CLIENT))

            ) :
    controllerUser = Profilcontroller(db)
    return  controllerUser.UpdatePassword(passwordUpdateData , cuurentUser)



#--> Service Proprietaire
@ClientRoutes.post("/serach" , response_model=ProprietaireResponse)
async  def searchPro(villesearch : str ,
                     db:Session = Depends(get_db),

                    ) :
    transactionFunction = Transactioncontoller(db)
    return  transactionFunction.Serach(villesearch)



@ClientRoutes.get("/get/allproprietaire" , response_model=List[ProprietaireResponse])
async  def getAllproprietaire(db : Session=Depends(get_db)) :
    contollerTransaction = Transactioncontoller(db)
    return  contollerTransaction.HomUser()


@ClientRoutes.get("/get/oneproprietaire/{id}" , response_model=ProprietaireResponse)
async  def Showproprietaire(id : UUID , db : Session = Depends(get_db)) :
    Transaction  = Transactioncontoller(db)
    return Transaction.ShowOneListing(id)


# Reservation
@ClientRoutes.post("/reservation/RendezVous/{id}")
async  def ReservationFunction(coment : str ,
                               id : UUID ,
                               db :Session = Depends(get_db),
                            currentUser : User = Depends(require_role(RoleUser.CLIENT))
                                ) :
    transaction =Transactioncontoller(db)
    return  transaction.ReservationRendezVous(id , coment , currentUser)

@ClientRoutes.post("/anuler/reservation")
async  def AnulerReservation() :
    pass

@ClientRoutes.get("/get/Reservation")
async  def getReservationClient() :
    pass


#  prediction ai machine learning
@ClientRoutes.post("/prediction/pro")
async def Predictionrequest() :
    pass






