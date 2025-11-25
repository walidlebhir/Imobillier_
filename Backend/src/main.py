from dotenv import  load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.Routes.TestApp import AppRoutes
from src.Config.DB import Base , engine
from src.Routes.AuthRoute import AuthenticationRoute
from src.Routes.AdminRoute import EntrepriseRoute
from src.Routes.ClientRoutes import ClientRoutes


# importation des model Pour la creation 
from src.Models.User import User
from src.Models.Entreprise import Entreprise
from src.Models.Propritaire import Proprietaire
from src.Models.Reservation import Reservation
from src.Models.photo import  Photo
# creation des tables (Pour demarage de serveur )

load_dotenv()

Base.metadata.create_all(bind=engine)



app = FastAPI()

# Cree une midlware pour request react js
app.add_middleware(
    CORSMiddleware ,
    allow_origins=["http://localhost:5173"],  # URL de React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(AppRoutes) 
app.include_router(AuthenticationRoute)
app.include_router(EntrepriseRoute)
app.include_router(ClientRoutes)


