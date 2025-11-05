import uuid
from sqlalchemy import Column , String , ForeignKey,Integer , Text, DateTime 
from sqlalchemy.sql import func 
from datetime import datetime
from Config.DB import Base 
from sqlalchemy.orm import relationship 
from sqlalchemy.dialects.postgresql import UUID 


class Entreprise(Base) : 

    __tablename__ = "entreprise"

    id =Column (Integer , primary_key=True , index=True) 
    Nom = Column (String ,nullable = False) 
    Description_DT = Column (Text ) 
    Location = Column (String ) 

    # Relation Entre User et entreprise 
    gestionaireId = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True)
    gestionnaire = relationship("User", back_populates="entreprise")


    # relation avec propritaire : One to many  
    proprietaire = relationship("Proprietaire" , back_populates="entreprise" , )

    # date creation et date de supresion 
    CreateAt = Column (DateTime(timezone=True) , server_default= func.now()) 
    UpdateAt =Column (DateTime(timezone=True),onupdate=func.now() , server_default=func.now() )
