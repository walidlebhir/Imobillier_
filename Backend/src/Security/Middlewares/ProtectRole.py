from fastapi import HTTPException , Depends , status
from ProtectConection import get_current_User
from Models.User import User

# protect role 

def require_role(required_role : str) :
    def role_dependcy(curent_User :User = Depends(get_current_User) ) :
        if curent_User.Role != required_role : 
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN , 
                detail="operation Non authorizer"
            )
        
        return curent_User 
    return role_dependcy


