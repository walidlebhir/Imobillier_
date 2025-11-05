# creation une connexio au base de donnes 

from sqlalchemy import create_engine 
from sqlalchemy.orm import sessionmaker 
from sqlalchemy.ext.declarative import declarative_base 



URL_DB = "postgresql+psycopg://postgres:walid2005@localhost:5432/immobilier"

engine = create_engine(URL_DB) 
Session_Local = sessionmaker(
    autocommit=False, autoflush=False, bind=engine
)

Base = declarative_base()

def get_db() : 
    db = Session_Local() 
    try : 
        yield db 
    finally  : 
        db.close() 

