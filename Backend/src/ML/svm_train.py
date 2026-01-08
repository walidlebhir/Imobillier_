
import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder
from sklearn.preprocessing import StandardScaler
from sklearn.compose import  ColumnTransformer
from sklearn.svm import SVC
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
import pickle

df = pd.read_csv("src/ML/imobilieData.csv")

df.columns

df['proprety type'].unique()



X = df[['surface', 'bedroom','bathroom', 'city']]
Y = df['proprety type']

numeric_feature = ['surface', 'bedroom', 'bathroom']
city = ['city']

processor = ColumnTransformer(
    transformers = [
        ('num' , StandardScaler() , numeric_feature) ,
        ('city' , OneHotEncoder(handle_unknown='ignore') , city )
    ]
)

# creation de piplane model
model_svm = SVC(
     kernel='rbf',
    C=10,
    gamma='scale',
    probability=True,
    class_weight='balanced',
    random_state=42
)
model_svm_pipline = Pipeline(steps=[
    ('proprocessing' , processor) ,
    ('model' , model_svm)
])

# splite des donnes de train et de test

X_train , X_test , Y_train , Y_test = train_test_split(X , Y ,random_state=40, test_size=0.2)

model_svm_pipline.fit(X_train , Y_train)

y_prerdict = model_svm_pipline.predict(X_test)


# on calculons accurancy
from sklearn.metrics import accuracy_score

acurancy  = accuracy_score(Y_test , y_prerdict)
print(f"accurancy est {acurancy}")

pickle.dump(model_svm_pipline, open("src/ai_models/svm_model_classification.pkl", "wb"))