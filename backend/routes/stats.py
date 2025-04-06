# api endpoint to get stats about requests and offers

from fastapi import APIRouter
from firebase_config import db

router = APIRouter()

@router.get("/stats")
def get_stats():
    # count the total requests and total open requests
    total_requests = len(list(db.collection("requests").stream()))
    open_requests = len(list(
        db.collection("requests").where("status", "==", "open").stream()
    ))

    # count total offers and total open offers
    total_offers = len(list(db.collection("offers").stream()))
    open_offers = len(list(
        db.collection("offers").where("status", "==", "open").stream()
    ))

    return {
        "total_requests": total_requests,
        "open_requests": open_requests,
        "total_offers": total_offers,
        "open_offers": open_offers
    }

__all__ = ["router"]