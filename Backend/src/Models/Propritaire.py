from sqlalchemy import Column , String, DateTime , Integer,ForeignKey , Numeric
from sqlalchemy.sql import func 
from sqlalchemy.dialects.postgresql import UUID 
from sqlalchemy.orm import relationship 
import uuid 
from datetime import datetime
from src.Config.DB import Base

class Proprietaire(Base):
    __tablename__ = "proprietaire" 

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    titre = Column(String, index=True)
    type_pro = Column(String, index=True)
    surface = Column(Numeric(10, 2), index=True)
    chamber = Column(Integer)
    ville = Column(String)
    code_ville = Column(String)
    quartie = Column(String)
    prix = Column(Numeric(14, 3))
    description = Column(String)

    # Relation avec Entreprise
    entreprise_id = Column(Integer, ForeignKey("entreprise.id"))
    entreprise = relationship("Entreprise", back_populates="proprietaire")

    # Relation avec Reservation
    reservation = relationship("Reservation", back_populates="Propritaire", uselist=False)

    # Relation Entre les images
    images = relationship("Photo", back_populates="proprietaire", cascade="all, delete-orphan")

    # Dates
    CreateAt = Column(DateTime(timezone=True), server_default=func.now())
    UpdateAt = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())
