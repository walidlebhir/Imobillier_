from pydantic import BaseModel , Field


class EntrepriseRequest(BaseModel) : 
    Nom : str = Field(... , min_length=4 , max_length=40) 
    Description_DT : str = Field(... , min_length=5 , max_length=100) 
    Location : str 

    class Config:
        allow_population_by_field_name = True
