import uuid
from sqlalchemy import Column , Integer , String , DateTime , ForeignKey
from sqlalchemy.sql import func 
from sqlalchemy.dialects.postgresql import UUID 

from src.Config.DB import Base
from sqlalchemy.orm import relationship 


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


    # date de creation et de modefication automatique 
    CreateAt = Column (DateTime(timezone=True) , server_default= func.now()) 
    UpdateAt =Column (DateTime(timezone=True),onupdate=func.now() , server_default=func.now() )
