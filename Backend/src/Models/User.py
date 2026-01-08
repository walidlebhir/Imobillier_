import uuid 
from sqlalchemy import Column , Integer , String  , DateTime  , Enum as sqlEnum
from sqlalchemy.sql import func 
from src.Config.DB import Base
from sqlalchemy.orm import relationship 
from sqlalchemy.dialects.postgresql import UUID 
from datetime import datetime 
from enum import Enum 

# Role user dans notre systeme 
class RoleUser(str ,Enum) : 
    CLIENT = "client" 
    GESTIONAIRE = "gestionaire" 
    SUPER_ADMIN = "admin" 




class User(Base):
    __tablename__ = "users"
    id  = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    Nom = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    teliphone = Column(String)
    Role = Column(sqlEnum(RoleUser), nullable=False, default=RoleUser.CLIENT)

    # Relation avec Predictiondata (un utilisateur peut avoir plusieurs prédictions)
    predictions = relationship("Predictiondata", back_populates="gestionnaire")

    # Relation avec entreprise (One-to-One)
    entreprise = relationship("Entreprise", back_populates="gestionnaire", uselist=False)

    # Relation avec réservation (One-to-One)
    reservation = relationship("Reservation", back_populates="Clinet", uselist=False)

    # date de création et modification
    CreateAt = Column(DateTime(timezone=True), server_default=func.now())
    UpdateAt = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())
