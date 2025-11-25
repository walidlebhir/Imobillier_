from sqlalchemy import  String , Column , DateTime , Integer
from sqlalchemy.sql import  func

from src.Config.DB import  Base
from sqlalchemy.orm import  relationship



class Predictiondata(Base) :
    __tablename__ ="predictiondata"
    id=Column(Integer , primary_key=True , index=True)
