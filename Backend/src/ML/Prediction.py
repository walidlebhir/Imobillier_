import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.linear_model import Ridge
from sklearn.feature_extraction.text import TfidfVectorizer
from scipy.sparse import hstack, csr_matrix
import pickle

# Load data
df = pd.read_csv("src/ML/imobilieData.csv")

# Drop column correctly
df.drop(columns='principale', inplace=True)

# Columns
num_columns = ['surface', 'bedroom', 'bathroom']
cat_columns = ['city', 'proprety type']
text_column = 'address'
target = 'price_£'

X = df[num_columns + cat_columns + [text_column]]
y = df[target].astype(float)

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Scale numeric
scaler = StandardScaler()
X_train_num = scaler.fit_transform(X_train[num_columns])
X_test_num = scaler.transform(X_test[num_columns])

# Encode categorical
encoder = OneHotEncoder(handle_unknown='ignore', sparse_output=True)
X_train_cat = encoder.fit_transform(X_train[cat_columns])
X_test_cat = encoder.transform(X_test[cat_columns])

# TF-IDF text
tfidf = TfidfVectorizer(max_features=5000, ngram_range=(1, 2), stop_words='english')
X_train_text = tfidf.fit_transform(X_train[text_column])
X_test_text = tfidf.transform(X_test[text_column])

# Convert numeric to sparse
X_train_num = csr_matrix(X_train_num)
X_test_num = csr_matrix(X_test_num)

# Final feature matrix
X_train_final = hstack([X_train_num, X_train_cat, X_train_text])
X_test_final = hstack([X_test_num, X_test_cat, X_test_text])

# Model
model = Ridge(alpha=1.0)
model.fit(X_train_final, y_train)

# Prediction
y_pred = model.predict(X_test_final)

from sklearn.metrics import r2_score, mean_absolute_error
print("R2:", r2_score(y_test, y_pred))
print("MAE:", mean_absolute_error(y_test, y_pred))

# Save objects
pickle.dump(scaler, open("src/ai_models/scaler.pkl", "wb"))
pickle.dump(encoder, open("src/ai_models/onehot.pkl", "wb"))
pickle.dump(tfidf, open("src/ai_models/tfidf.pkl", "wb"))
pickle.dump(model, open("src/ai_models/model.pkl", "wb"))
