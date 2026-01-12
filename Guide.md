# Guide d'installation — Frontend & Backend (Windows)

Ce guide rapide explique comment préparer l'environnement de développement pour le Backend (Python) et le Frontend (Node/Vite) sur Windows : création de l'environnement virtuel, installation des dépendances et lancement des serveurs en local.

**Pré-requis**
- Python 3.10+ installé et disponible dans le PATH
- Node.js 16+ (ou version requise par `Frontend/package.json`)
- Git (optionnel)

**Backend (Backend/)**

1. Se positionner dans le dossier Backend :

```powershell
cd Backend
```

2. Créer l'environnement virtuel (venv) et l'activer :

```powershell
python -m venv venv
venv\Scripts\Activate.ps1   # PowerShell
# ou pour cmd.exe : venv\Scripts\activate.bat
```

3. Mettre `pip` à jour et installer les dépendances :

```powershell
python -m pip install --upgrade pip
pip install -r requirement.txt
```

4. Variables d'environnement et fichiers secrets
- Créez un fichier `.env` (ou copiez `.env.example` s'il existe) et ajoutez vos clés/URL (base de données, cloudinary, JWT secret, etc.).

5. Lancer l'application Backend :
- Si `src/main.py` démarre le serveur directement :

```powershell
python src/main.py
```

- Si le projet utilise FastAPI / ASGI et expose une app nommée `app` dans `src/main.py`, vous pouvez utiliser `uvicorn` :

```powershell
pip install uvicorn
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

Vérifiez `Backend/src/main.py` pour confirmer le point d'entrée.

**Frontend (Frontend/)**

1. Se positionner dans le dossier Frontend :

```powershell
cd ..\Frontend
```

2. Installer les dépendances Node :

```powershell
npm install
# ou si vous utilisez yarn : yarn
```

3. Variables d'environnement
- Créez un fichier `.env` à la racine du dossier `Frontend` si nécessaire (consultez `Frontend/package.json` ou le code pour les variables attendues).

4. Lancer le serveur de développement (Vite) :

```powershell
npm run dev
# ou pour build production : npm run build
```

**Commandes Git utiles**
- Si vous avez mis à jour `.gitignore` et que des fichiers ignorés sont déjà suivis par Git :

```powershell
git rm -r --cached .
git add .
git commit -m "Apply .gitignore"
```

**Remarques**
- Supprimez le dossier `venv` pour réinitialiser l'environnement Python, puis recréez-le.
- Adaptez les chemins si vous exécutez les commandes depuis un autre dossier.

**Souhaitez-vous que j'exécute ces étapes ?**
- Je peux créer/activer le `venv` et installer les paquets pour le Backend et/ou le Frontend ici (exécution des commandes dans le terminal). Dites-moi ce que vous voulez que j'exécute en premier.

Fin du guide rapide
