from fastapi import HTTPException, Depends, status
from src.Security.Middlewares.ProtectConection import get_current_User
from src.Models.User import User, RoleUser

def require_role(required_role: RoleUser):
    def role_dependency(current_user: User = Depends(get_current_User)):
        if current_user.Role != required_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Operation non autorisée"
            )
        return current_user
    return role_dependency
