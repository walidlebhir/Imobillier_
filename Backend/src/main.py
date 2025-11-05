from fastapi import FastAPI

from Routes.TestApp import AppRoutes 
from Config.DB import Base , engine 

# importation des model Pour la creation 
from Models.User import User 
from Models.Entreprise import Entreprise 
from Models.Propritaire import Proprietaire
from Models.Reservation import Reservation 

# creation des tables (Pour demarage de serveur ) 
Base.metadata.create_all(bind=engine)


app = FastAPI() 
app.include_router(AppRoutes) 

