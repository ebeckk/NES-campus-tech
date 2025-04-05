import firebase_admin
from firebase_admin import credentials, firestore
import os

cred_path = os.environ("serviceAccountKey")
firebase_admin.initialize_app(cred_path)

db = firestore.client()