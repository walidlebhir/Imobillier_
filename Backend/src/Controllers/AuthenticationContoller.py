
from Models.User import User 
from Validation.AuthDto import RegisterRequest

class AuthController : 

    def __init__(self , db):
        self.db = db 

    def Register(self , UserRegister : RegisterRequest ) : 
        pass