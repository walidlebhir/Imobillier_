from fastapi import APIRouter , HTTPException , Depends 
from sqlalchemy.orm import Session 
from Config.DB import get_db
from Security.Middlewares.ProtectRole import require_role
from Models.User import RoleUser
from Validation.GestionaireDto import EntrepriseRequest
from Controllers.Entreprise.ProfilContoller import ProfilController
from Controllers.Entreprise.EntrepriseContoller import EntrepriseContollers
# creation servece Route pour gestionaire 

EntrepriseRoute = APIRouter() 

@EntrepriseRoute.get("/profil") 
async def getProfil(db : Session = Depends(get_db) , current_user = Depends(require_role(RoleUser.GESTIONAIRE))) : 
    contollerprofil = ProfilController(db)
    return contollerprofil.getUserProfil(current_user) 


@EntrepriseRoute.post("/add/entreprise") 
async def addEntreprise(DataCreate : EntrepriseRequest, db : Session = Depends(get_db) , UserConecter = Depends(require_role(RoleUser.GESTIONAIRE))) : 
    controllerEntre = EntrepriseContollers(db) 
    return controllerEntre.CreateEntreprise(UserConecter,DataCreate)
