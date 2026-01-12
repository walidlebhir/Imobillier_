
import numpy as np
import os 
import pickle
from scipy.sparse import hstack, csr_matrix
import pandas as pd
from sentence_transformers import SentenceTransformer 
from sklearn.metrics.pairwise import cosine_similarity
from chromadb import Client 
from chromadb.config import Settings 
from chromadb import PersistentClient

from fastapi import HTTPException 
from src.Validation.AIRequestDTO import PredictionDTO
from src.Models.PredictionData import Predictiondata
from src.Models.User import User 
from src.Validation.AIRequestDTO import ClassificationDTO 
from src.Validation.AIRequestDTO import PropmptRequest 


from src.Config.chromadbConfig import CHROMA_PATH , COLLECTION_NAME

scaler = pickle.load(open("src/ai_models/scaler.pkl", "rb"))
encoder = pickle.load(open("src/ai_models/onehot.pkl", "rb"))
tfidf = pickle.load(open("src/ai_models/tfidf.pkl", "rb"))
model = pickle.load(open("src/ai_models/model.pkl", "rb"))
svm_model = pickle.load(open("src/ai_models/svm_model_classification.pkl", "rb"))




model_transformers = SentenceTransformer("all-MiniLM-L6-v2")

# chromadb path 

CHROMA_PATH = r"C:\Users\WALID\Desktop\ImobilieProjet\Backend\src\ML\chroma_data"

client = PersistentClient(
    path=CHROMA_PATH,
    settings=Settings(anonymized_telemetry=False)
)

collection = client.get_collection("imobilie_00")

class aiControler : 
    def __init__(self, db ): 
        self.database = db 

    def StorePrediction(self , dataPrediction :PredictionDTO , userconecter:User , pricepredict   ): 
        # --> Fonction permet de stocker des predictions 
        try : 
            predictionObject = Predictiondata(
                gestionaireId = userconecter.id , 
                surface = dataPrediction.surface , 
                bedroom = dataPrediction.bedroom , 
                bathroom = dataPrediction.bathroom , 
                city = dataPrediction.city , 
                proprety_type = dataPrediction.proprety_type , 
                address = dataPrediction.address  , 
                price_predict = pricepredict 
            )

            self.database.add(predictionObject)
            self.database.commit() 
            self.database.refresh(predictionObject)
            return True 
        except Exception as e : 
            # debug 
            print(f"Probelmme dans le server {e}") 
            raise HTTPException(
                status_code=500 , 
                detail=f"Problemme dans {e}"
            )

    def PredictionData(self , datapredict : PredictionDTO , userConnecter : User) : 
        # creation fonction pour predicter le prix 
        try : 
            num_columns = ['surface', 'bedroom', 'bathroom']
            cat_columns = ['city', 'proprety type']
            text_column = 'address'

            # Create DataFrame (1 row)
            df = pd.DataFrame([{
                'surface': datapredict.surface,
                'bedroom': datapredict.bedroom ,
                'bathroom': datapredict.bathroom, 
                'city': datapredict.city,
                'proprety type': datapredict.proprety_type,
                'address': datapredict.address
            }])

            
            X_num = scaler.transform(df[num_columns])
            X_num = csr_matrix(X_num)

            X_cat = encoder.transform(df[cat_columns])

            X_text = tfidf.transform(df[text_column])

            X_final = hstack([X_num, X_cat, X_text])


            prediction = model.predict(X_final)[0]
            lower = prediction * 0.95
            upper = prediction * 1.05
            
            # creation du prediction dans dataBase 
            isStorage_database = self.StorePrediction(datapredict , userConnecter , prediction)
            return {
                "message" : "Prediction est effectue"
            }

            # Stockage des donnes dans la base de donnes 
        except Exception as e : 
            # debug 
            print(f"problemme dans le server {e}")  
            raise HTTPException(
                status_code=501 , 
                detail=f"Problemme dans le server {e}"
            )

    def ClassificationType(sef , dataClassification :ClassificationDTO) : 
        try : 
            new_data = {
                "surface" : dataClassification.surface , 
                "bedroom" : dataClassification.bedroom  , 
                "bathroom" : dataClassification.bathroom , 
                "city" : dataClassification.city 
            }

            dataFramPrerdiction = pd.DataFrame([new_data]) 
            classPredict  = svm_model.predict(dataFramPrerdiction)
            ProbabilitePredict = svm_model.predict_proba(dataFramPrerdiction)
            return {
                "classpro" : classPredict[0] , 
                "Probabilite" : float(max(ProbabilitePredict[0]))
            }
        except Exception as e : 
            # debug 
            print(f"Problemme dans le server {e}") 
            raise HTTPException(
                status_code= 501 , 
                detail=f"Problemme dans le server {e} "
            )



    def SerchSimentic(self , dataPrompt : PropmptRequest) : 
        # recherche sementique base sur transformers 
        try : 
            text_prompt = dataPrompt.prompt 
            query_embidding = model_transformers.encode([text_prompt]) 
            print(query_embidding)
            print(CHROMA_PATH) 
            print(client.list_collections()) 
            # recherche semntique 
            print(f"document : { collection.count()} ")
            resultata_serch = collection.query(
                query_embeddings=query_embidding , 
                n_results=10 
            ) 
            return {
                "data_serch" : resultata_serch["metadatas"] 
            }
        except Exception as e : 
            # debug 
            print(f"Problemme dans le server {e}") 
            raise HTTPException(
                status_code = 500 , 
                detail =f"Problemme dans le server {e}" 
            )


    # recuperation de prediction : 
    def getPrediction(self , userconecter : User) : 
        try : 
            Data_prediction = self.database.query(Predictiondata).filter(
                Predictiondata.gestionaireId == userconecter.id 
            ).all()

            return Data_prediction 

        except Exception as e : 
            # deubg 
            print(f"Problemme dansle server {e}") 
            raise HTTPException(
                status_code=500 , 
                detail= f"Problemme dans le sserver {e}" 
            )
        
