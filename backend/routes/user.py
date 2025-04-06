# endpoint that returns user info decoded from the Firebase ID token

from fastapi import APIRouter, Depends
from auth_utils import verify_token

router = APIRouter()

@router.get("/me")
def get_current_user(decoded_user=Depends(verify_token)):
    """
    Returns info about the current logged-in user based on Firebase token.
    """
    return {
        "uid": decoded_user["uid"],
        "email": decoded_user.get("email"),
        "name": decoded_user.get("name"),
        "email_verified": decoded_user.get("email_verified", False)
    }

__all__ = ["router"]