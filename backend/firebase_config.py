import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("/Users/ezequiel/Desktop/NES/NES-campus-tech/keys/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()