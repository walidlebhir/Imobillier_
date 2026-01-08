from fastapi import APIRouter
import numpy as np
import pickle
from scipy.sparse import hstack, csr_matrix
import pandas as pd


from fastapi import HTTPException 
from src.Validation.AIRequestDTO import PredictionDTO
from src.Models.PredictionData import Predictiondata
from src.Models.User import User 
from src.Validation.AIRequestDTO import ClassificationDTO 

scaler = pickle.load(open("src/ai_models/scaler.pkl", "rb"))
encoder = pickle.load(open("src/ai_models/onehot.pkl", "rb"))
tfidf = pickle.load(open("src/ai_models/tfidf.pkl", "rb"))
model = pickle.load(open("src/ai_models/model.pkl", "rb"))
svm_model = pickle.load(open("src/ai_models/svm_model_classification.pkl", "rb"))


class aiControler : 
    def __init__(self, db ): 
        self.database = db 

    def PredictionData(self , datapredict : PredictionDTO ) : 
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

            return {
                "predicted_price": round(float(prediction), 2),
                "interval": [round(lower, 2), round(upper, 2)]
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
                "type de proprietaire est " : classPredict[0] , 
                "Probabilite" : float(max(ProbabilitePredict[0]))
            }
        except Exception as e : 
            # debug 
            print(f"Problemme dans le server {e}") 
            raise HTTPException(
                status_code= 501 , 
                detail=f"Problemme dans le server {e} "
            )



    def SerchSimentic() : 
        pass 
