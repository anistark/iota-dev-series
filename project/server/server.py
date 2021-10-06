from dotenv import load_dotenv
from fastapi import FastAPI
import json

load_dotenv()

app = FastAPI()


valid_tickets = ['123', '1234', '12345', '123456']


@app.get("/{key}")
def verify_door(key):
    result = False
    print("key:", key)
    if key in valid_tickets:
        result = True
    return result
