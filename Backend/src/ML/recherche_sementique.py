import os
import pandas as pd
from sentence_transformers import SentenceTransformer
from chromadb import Client
from chromadb.config import Settings


def build_chroma_db():
    print("🚀 Construction de ChromaDB...")

    # ===============================
    # 1️⃣ Chemins absolus
    # ===============================
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    CSV_PATH = os.path.join(BASE_DIR, "imobilieData.csv")
    CHROMA_PATH = os.path.join(BASE_DIR, "chroma_data")

    # ===============================
    # 2️⃣ Charger les données
    # ===============================
    data = pd.read_csv(CSV_PATH)

    # ===============================
    # 3️⃣ Texte sémantique
    # ===============================
    data["texte"] = (
        "Type: " + data["proprety type"].astype(str) +
        ", Prix: " + data["price_£"].astype(str) +
        ", Surface: " + data["surface"].astype(str) +
        ", Chambres: " + data["bedroom"].astype(str) +
        ", Salles de bain: " + data["bathroom"].astype(str) +
        ", Adresse: " + data["address"].astype(str) +
        ", Ville: " + data["city"].astype(str) +
        ", Région: " + data["principale"].astype(str)
    )

    data["id"] = data.index.astype(str)

    # ===============================
    # 4️⃣ Initialiser ChromaDB
    # ===============================
    client = Client(
        Settings(
            persist_directory=CHROMA_PATH,
            anonymized_telemetry=False
        )
    )

    collection = client.get_or_create_collection("imobilie_00")

    # 🔐 Sécurité
    if collection.count() > 0:
        print("✅ ChromaDB existe déjà — arrêt")
        return

    # ===============================
    # 5️⃣ Modèle d'embeddings
    # ===============================
    model = SentenceTransformer("all-MiniLM-L6-v2")

    # ===============================
    # 6️⃣ Embeddings
    # ===============================
    embeddings = model.encode(
        data["texte"].tolist(),
        batch_size=64,
        show_progress_bar=True
    )

    # ===============================
    # 7️⃣ Insertion par batches
    # ===============================
    BATCH_SIZE = 2000

    documents = data["texte"].tolist()
    ids = data["id"].tolist()
    metadatas = data[
        [
            "price_£",
            "proprety type",
            "surface",
            "bedroom",
            "bathroom",
            "address",
            "city",
            "principale"
        ]
    ].to_dict(orient="records")

    for i in range(0, len(documents), BATCH_SIZE):
        collection.add(
            ids=ids[i:i + BATCH_SIZE],
            embeddings=embeddings[i:i + BATCH_SIZE].tolist(),
            documents=documents[i:i + BATCH_SIZE],
            metadatas=metadatas[i:i + BATCH_SIZE]
        )

    print("✅ ChromaDB créée et sauvegardée automatiquement")
    print(f"📁 Dossier : {CHROMA_PATH}")
    print(f"📊 Documents indexés : {collection.count()}")


if __name__ == "__main__":
    build_chroma_db()
