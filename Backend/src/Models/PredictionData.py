from sqlalchemy import  String ,Float, Column , INT,DateTime , Integer
from sqlalchemy.sql import  func 
from sqlalchemy import ForeignKey 
from src.Config.DB import  Base
from sqlalchemy.orm import  relationship
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime

class Predictiondata(Base):
    __tablename__ ="predictiondata"
    id = Column(Integer , primary_key=True , index=True)

    # id client
    gestionaireId = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    gestionnaire = relationship("User", back_populates="predictions")

    surface = Column(Float) 
    bedroom = Column(Integer) 
    bathroom = Column(Integer) 
    city = Column(String) 
    proprety_type = Column(String)
    address = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    price_predict = Column(Float)
