# creates and retrieves offers (people giving out flexi)

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from firebase_config import db
from typing import Optional
from datetime import datetime, timezone

router = APIRouter()

class OffersTable(BaseModel):
    user_id: str                           # person making the offer
    request_id: Optional[str] = None       # the request they are respodning to (optional)
    message: str = ""                      


@router.post("/offers")
def create_offer(offer: OffersTable):
    # if the offer is for a specific request, make sure it exists
    if offer.request_id:
        request_ref = db.collection("requests").document(offer.request_id)
        if not request_ref.get().exists:
            raise HTTPException(status_code=404, detail="Request not found")

    # save the offer     
    db.collection("offers").add({             
        "user_id": offer.user_id,
        "request_id": offer.request_id,
        "message": offer.message,
        "status": "open",
        "timestamp": datetime.now(timezone.utc)
    })
    return{"message": "Offer created"}

# api endpoint to get offers
@router.get("/offers")
def get_offers(
    user_id: Optional[str] = Query(None), 
    request_id: Optional[str] = Query(None),
    limit: Optional[int] = Query(None),
    sort: Optional[str] = Query("desc")
):
    
    query = db.collection("offers").order_by("timestamp", direction="DESCENDING" if sort == "desc" else "ASCENDING")

    if limit:
        query = query.limit(limit)
    
    docs = query.stream()
    offers = []

    for o in docs:
        data = o.to_dict()
        if user_id and data.get("user_id") != user_id:
            continue
        if request_id and data.get("request_id") != request_id:
            continue
        data["id"] = o.id
        offers.append(data)

    return offers


__all__ = ["router"]