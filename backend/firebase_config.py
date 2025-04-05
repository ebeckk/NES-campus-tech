import firebase_admin
from dotenv import load_dotenv
from firebase_admin import credentials, firestore, initialize_app
import os

load_dotenv()

cred_path = os.environ["GOOGLE_APPLICATION_CREDENTIALS"]
cred = credentials.Certificate(cred_path)

initialize_app(cred)
db = firestore.client()