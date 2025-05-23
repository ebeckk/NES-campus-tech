from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import requests, offers, user_posts, stats, user



app = FastAPI()

# get requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # change to frontend url 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(requests.router)
app.include_router(offers.router)
app.include_router(user_posts.router)
app.include_router(stats.router)
app.include_router(user.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Flexi Fairy API!"}