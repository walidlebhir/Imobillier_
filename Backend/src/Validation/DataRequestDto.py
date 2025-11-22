from pydantic import  BaseModel

# dataRequest


# UpdatePassword
class RequestUpdatePassword(BaseModel) :
    PasswordActuel : str
    NewPassword : str

