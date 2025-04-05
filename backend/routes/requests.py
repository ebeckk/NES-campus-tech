# creates and retrieves requests (people asking for flexi fairies)

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from firebase_config import db
from typing import Optional
from datetime import datetime, timezone

router = APIRouter()

class RequestTable(BaseModel):
    user_id: str
    amount: int
    note: str = ""

# create requests
@router.post("/requests") 
def create_request(request: RequestTable):
    db.collection("requests").add({ 
        "user_id": request.user_id,   # user_id
        "amount": request.amount,     # amount of $ requesting
        "note": request.note,         # message
        "status": "open",             # set request as open
        "timestamp": datetime.now(timezone.utc)  # timestamp for when the request was made
    })
    return {"message": "Request created"}


# get requests
@router.get("/requests")
def get_requests(
    user_id: Optional[str] = Query(None),
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
        data["id"] = r.id
        requests.append(data)
    
    return requests
   
__all__ = ["router"]