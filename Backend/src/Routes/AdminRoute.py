from fastapi import APIRouter, UploadFile,Form, File , HTTPException , Depends
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse
from uuid import  UUID
from src.Config.DB import get_db
from src.Security.Middlewares.ProtectRole import require_role
from src.Models.User import RoleUser
from src.Validation.GestionaireDto import EntrepriseRequest
from src.Controllers.Entreprise.ProfilContoller import ProfilController
from src.Controllers.Entreprise.EntrepriseContoller import EntrepriseContollers
from src.Validation.Dataresponse import EntrepriseResponse
from src.Controllers.Entreprise.PropritaireContoller import  PropietaireControllers
from src.Models.User import User
from src.Validation.GestionaireDto import ProprietaireRequest
from src.Validation.Dataresponse import ProprietaireResponse

import  json
from typing import List


# creation servece Route pour gestionaire 

EntrepriseRoute = APIRouter() 


#--> Profil Route
@EntrepriseRoute.get("/profil") 
async def getProfil(db : Session = Depends(get_db) , current_user = Depends(require_role(RoleUser.GESTIONAIRE))) : 
    contollerprofil = ProfilController(db)
    return contollerprofil.getUserProfil(current_user) 


#--> Entreprise Info Routes
@EntrepriseRoute.post("/add/entreprise") 
async def addEntreprise(DataCreate : EntrepriseRequest, db : Session = Depends(get_db) , UserConecter = Depends(require_role(RoleUser.GESTIONAIRE))) : 
    controllerEntre = EntrepriseContollers(db) 
    return controllerEntre.CreateEntreprise(UserConecter,DataCreate)

@EntrepriseRoute.get("/get/entreprise" , response_model=EntrepriseResponse)
async def getEntreprise(db:Session = Depends(get_db) , current_user = Depends(require_role(RoleUser.GESTIONAIRE))) :
    controllerEntreprise = EntrepriseContollers(db)
    return  controllerEntreprise.InfoEntreprise(current_user)


#--> proprietaire routes

@EntrepriseRoute.post("/create/newProprietaire" )
async  def CreateNewPro( DataCreate : ProprietaireRequest,
                        db : Session = Depends(get_db) ,
                        currentUser : User = Depends(require_role(RoleUser.GESTIONAIRE)) ,
                        ) :

    controllerProp = PropietaireControllers(db)
    return  controllerProp.CreateProprietaire(currentUser , DataCreate , files)

@EntrepriseRoute.post("/uploder/images/{id}")
async  def UploaderImages(
                            id :UUID ,
                            files : List[UploadFile] =File(...) ,
                            db:Session = Depends(get_db) ,
                            currentUser : User = Depends(require_role(RoleUser.GESTIONAIRE))
                          ) :
    controllerGestionaire = PropietaireControllers(db)
    return  controllerGestionaire.UploadFile(id , files)


@EntrepriseRoute.get("/get/Proprietaire" , response_model=List[ProprietaireResponse])
async def getProprietaire(db :Session = Depends(get_db)) :
    controllerPro = PropietaireControllers(db)
    return  controllerPro.ShowALL();

@EntrepriseRoute.get("/get/onepropritaire/{id}" , response_model=ProprietaireResponse)
async def geOnePropritaire(id : int , db : Session = Depends(get_db)) :
    ControllerPro = PropietaireControllers(db)
    return ControllerPro.ShowOne(id)


@EntrepriseRoute.delete("/delete/proprietaire/{id}")
async def DeleteProprietaire(id : int ) :
    pass



