# from dotenv import load_dotenv
# from fastapi import FastAPI

# load_dotenv()

# app = FastAPI()


valid_tickets = ['123', '1234', '12345', '123456']


# @app.get("/{key}")
# def verify_door(key):
#     result = False
#     print("key:", key)
#     if key in valid_tickets:
#         result = True
#     return result


import iota_client
client = iota_client.Client()

print(client.get_info())

# # encoding utf string into list of bytes
# some_utf_data = "some utf based data".encode("utf8")

# message = client.message(
#     index="some_data_index", data=some_utf_data
# )
# print(message)
