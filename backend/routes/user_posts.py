# retrieves offers and requests for a specific user

from fastapi import APIRouter, HTTPException, Query
from firebase_config import db
from typing import Optional


router = APIRouter()

@router.get("/user_posts")
def get_user_posts(user_id: Optional[str] = Query(None)):
    if not user_id:
        raise HTTPException(status_code = 400, detail = "user_id is required")
    
    # get all of the user's requests
    requests_query = db.collection("requests").where("user_id", "==", user_id).stream()
    requests = []
    for r in requests_query:
        data = r.to_dict()
        data["id"] = r.id
        requests.append(data)

    # get all of the user's offers
    offers_query = db.collection("offers").where("user_id", "==", user_id).stream()
    offers = []
    for o in offers_query:
        data = o.to_dict()
        data["id"] = o.id
        offers.append(data)

    # returns all of the requests and offers for the user
    return {
        "requests": requests,
        "offers": offers
    }

__all__ = ["router"]