# sign-in authentication with Firebase Auth

from fastapi import HTTPException, Header
from firebase_admin import auth

def verify_token(authorization: str = Header(...)) -> dict:
    """
    Verifies the Firebase ID token passed in the Authorization header.
    Returns the decoded user info (uid, email, etc.).
    """
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization format")
    
    id_token = authorization.split(" ")[1]

    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token # contains uid, email, etc...
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

