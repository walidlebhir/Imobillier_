from sqlalchemy import  Column , Integer, String , ForeignKey
from sqlalchemy.sql import  func
from sqlalchemy.dialects.postgresql import  UUID
from  sqlalchemy.orm import  relationship


from src.Config.DB import  Base



class Photo(Base) :
    __tablename__ = "Photo"

    id = Column(Integer , primary_key=True , index = True)
    url = Column(String)
    publicId = Column(String , nullable=False)

    # Relation entre proprietaire
    proprietaireId = Column(UUID(as_uuid=True) ,ForeignKey("proprietaire.id"))
    proprietaire = relationship("Proprietaire", back_populates="images")




