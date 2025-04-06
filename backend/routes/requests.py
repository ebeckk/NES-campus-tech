# creates and retrieves requests (people asking for flexi fairies)

from fastapi import APIRouter, HTTPException, Query, Depends
from pydantic import BaseModel
from firebase_config import db
from typing import Optional
from datetime import datetime, timezone
from auth_utils import verify_token

router = APIRouter()

class RequestTable(BaseModel):
    user_id: str
    amount: int
    note: str = ""

# create requests
@router.post("/requests") 
def create_request(request: RequestTable):
    request_data = { 
        "user_id": request.user_id,   # user_id
        "amount": request.amount,     # amount of $ requesting
        "note": request.note,         # message
        "status": "open",             # set request as open
        "timestamp": datetime.now(timezone.utc)  # timestamp for when the request was made
    }

    doc_ref = db.collection("requests").add(request_data)[1]
    new_doc = doc_ref.get()
    return {"id": new_doc.id, **new_doc.to_dict() }


# get requests
@router.get("/requests")
def get_requests(
    user_id: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    limit: Optional[int] = Query(None),
    sort: Optional[str] = Query("desc") # sort requests by newest first                   
):
    
    # build the base query with sorting
    query = db.collection("requests").order_by("timestamp", direction ="DESCENDING" if sort =="desc" else "ASCENDING")
   
    # apply limit (optional)
    if limit:
        query = query.limit(limit)
    
    docs = query.stream()
    requests = []

    for r in docs:
        data = r.to_dict()
        if user_id and data.get("user_id") != user_id:
            continue
        if status and data.get("status") != status:
            continue
        data["id"] = r.id
        requests.append(data)
    
    return requests

# new schema for updating a request
class UpdateRequest(BaseModel):
    amount: Optional[int] = None
    note: Optional[str] = None

# update a request by ID  (editing amount or note)
@router.patch("/requests/{request_id}")
def update_request(
    request_id: str,
    update_data: UpdateRequest,
    decoded_user=Depends(verify_token)
    ):

    request_ref = db.collection("requests").document(request_id)
    doc = request_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Request not found")
    
    current_data = doc.to_dict()
    
    # if post is already closed, not allowed to edit it
    if current_data.get("status") == "closed":
        raise HTTPException(status_code=400, detail="Cannot edit a closed request.")
    
    # check if user_id matches user token (check if it is OG user)
    if current_data.get("user_id") != decoded_user["uid"]:
        raise HTTPException(status_code = 403, detail="You do not own this request")
    
    update_dict = update_data.model_dump(exclude_unset=True)
    
    # don't allow to change user_id in request
    if "user_id" in update_dict:
        raise HTTPException(status_code=404, detail="user_id cannot be changed")
    
    update_dict["updated_at"] = datetime.now(timezone.utc) # update timestamp for the request

    # .update() updates the document in the collection
    request_ref.update(update_dict)

    updated_doc = request_ref.get()
    return {"request deleted:, ""id": updated_doc.id, **updated_doc.to_dict()}

# delete a request by ID
@router.delete("/requests/{request_id}")
def delete_request(request_id: str, decoded_user=Depends(verify_token)):
    request_ref = db.collection("requests").document(request_id)
    doc = request_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Request not found")
    
    # check if user_id matches user token (check if it is OG user)
    current_data = doc.to_dict()
    if current_data.get("user_id") != decoded_user["uid"]:
        raise HTTPException(status_code=403, detail="You do not own this request")
    
    # .delete() deletes the document in the collection
    request_ref.delete()
    return {"message": "Request deleted"}

__all__ = ["router"]