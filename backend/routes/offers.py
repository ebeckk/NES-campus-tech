# creates and retrieves offers (people giving out flexi)

from fastapi import APIRouter, HTTPException, Query, Depends
from pydantic import BaseModel
from firebase_config import db
from typing import Optional
from datetime import datetime, timezone
from auth_utils import verify_token

router = APIRouter()

class OffersTable(BaseModel):
    user_id: str                           # person making the offer
    request_id: Optional[str] = None       # the request they are respodning to (optional)
    message: str = ""                      # message that the user would write on their post 


@router.post("/offers")
def create_offer(offer: OffersTable):
    # if the offer is for a specific request, make sure it exists
    if offer.request_id:
        request_ref = db.collection("requests").document(offer.request_id)
        if not request_ref.get().exists:
            raise HTTPException(status_code=404, detail="Request not found")

    # save the offer     
    offer_data = {             
        "user_id": offer.user_id,
        "request_id": offer.request_id,
        "message": offer.message,
        "status": "open",
        "timestamp": datetime.now(timezone.utc)
    }

    doc_ref = db.collection("offers").add(offer_data)[1]
    new_doc = doc_ref.get()
    return{"id": new_doc.id, **new_doc.to_dict()}

# api endpoint to get offers
@router.get("/offers")
def get_offers(
    user_id: Optional[str] = Query(None), 
    request_id: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
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
        if status and data.get("status") != status:
            continue
        data["id"] = o.id
        offers.append(data)

    return offers

class UpdateOffer(BaseModel):
    request_id: Optional[str] = None
    message: Optional[str] = None


# update offer by ID (can edit messages)
@router.patch("/offers/{offer_id}")
def update_offers(
    offer_id: str, 
    update_data: UpdateOffer,
    decoded_user=Depends(verify_token)
    ):

    offer_ref = db.collection("offers").document(offer_id)
    doc = offer_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Offer not found")
    
    current_data = doc.to_dict()
    
    # prevent a post to be edited if already closed
    if current_data.get("status") == "closed":
        raise HTTPException(status_code=400, detail="cannot edit a closed offer")
    
    # only the user who created the offer can edit it
    if current_data.get("user_id") != decoded_user["uid"]:
        raise HTTPException(status_code=403, detail="You do not own this offer.")

    
    update_dict = update_data.model_dump(exclude_unset=True)
    
    if "user_id" in update_dict:
        raise HTTPException(status_code=404, detail="user_id cannot be changed")
    
    update_dict["updated at"] = datetime.now(timezone.utc)
    # .update() updates the document in the collection
    offer_ref.update(update_dict)

    updated_doc = offer_ref.get()
    return {"offer deleted:, ""id": updated_doc.id, **updated_doc.to_dict()}

# delete offer by ID
@router.delete("/offers/{offer_id}")
def delete_offer(offer_id: str, decoded_user=Depends(verify_token)):
    offer_ref = db.collection("offers").document(offer_id)
    doc = offer_ref.get()
    if not doc().exists:
        raise HTTPException(status_code=404, detail="Offer not found")
    
    # only user who created OG offer can delete it 
    current_data = doc.to_dict()
    if current_data.get("user_id") != decoded_user["uip"]:
        raise HTTPException(status_code=403, detail="You do not own this offer.")
    
    # .delete() deletes the document in the collection
    offer_ref.delete()
    return {"message": "Offer deleted"}

__all__ = ["router"]