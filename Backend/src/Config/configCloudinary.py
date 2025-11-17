import  cloudinary
import  os
from dotenv import  load_dotenv

load_dotenv()


cloudName = os.getenv("CLOUDNAME")
apiKey = os.getenv("APIKEY")
apiSecret =os.getenv("SECRETKEY")

cloudinary.config(
    cloud_name = cloudName ,
    api_key= apiKey,
    api_secret=apiSecret,
    secure=True
)

