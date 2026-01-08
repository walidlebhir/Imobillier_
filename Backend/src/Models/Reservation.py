import uuid
from sqlalchemy import Column , Integer , String , DateTime , ForeignKey , Enum as sqlenum
from sqlalchemy.sql import func 
from sqlalchemy.dialects.postgresql import UUID 

from src.Config.DB import Base
from sqlalchemy.orm import relationship 
from enum import  Enum

class StatusReservation(Enum) :
    Valider = "accepter"
    refuser = "refuser"
    Encour = "encour"
    Anuler = "anuler"

class Reservation(Base) : 
    __tablename__ = "reservation" 

    id = Column(UUID(as_uuid=True), primary_key=True , default=uuid.uuid4 , unique=True , nullable=False)
    Commantaire = Column(String ) 

    #relation entre User etresrevation OneToOne 
    id_client = Column(UUID(as_uuid=True) ,ForeignKey("users.id"), unique=True )
    Clinet = relationship("User" , back_populates="reservation") 

    # relation proprtaire 
    id_proprietaire = Column(UUID(as_uuid=True) , ForeignKey("proprietaire.id") , unique=True)
    Propritaire = relationship("Proprietaire" , back_populates="reservation") 

    # status Reservation
    status = Column(sqlenum(StatusReservation) , nullable=False , default=StatusReservation.Encour)

    # date de reservation
    date_reservation = Column(DateTime(timezone=True) , nullable=False)

    # date de creation et de modefication automatique 
    CreateAt = Column (DateTime(timezone=True) , server_default= func.now()) 
    UpdateAt =Column (DateTime(timezone=True),onupdate=func.now() , server_default=func.now() )

