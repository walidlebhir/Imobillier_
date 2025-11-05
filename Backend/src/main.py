from fastapi import FastAPI

from Routes.TestApp import AppRoutes 
from Config.DB import Base , engine 

# creation des tables (Pour demarage de serveur ) 
Base.metadata.create_all(bind=engine)


app = FastAPI() 
app.include_router(AppRoutes) 

