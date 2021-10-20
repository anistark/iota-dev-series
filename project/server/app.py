# from dotenv import load_dotenv
import json
import iota_client
import itertools, sys

# load_dotenv()

# client = iota_client.Client()
client = iota_client.Client(nodes_name_password=[['https://api.lb-0.h.chrysalis-devnet.iota.cafe/']])

valid_tickets = ['123', '1234', '12345', '123456']
topic = "ticket/door/1"
pushTopic = 'messages/indexation/' + topic

# print("client:", client)
# print("get_info:", json.dumps(client.get_info(), indent=4))

# # encoding utf string into list of bytes
some_utf_data = "some utf based data".encode("utf8")

def send_result_to_door(result):
    result = str(result).encode("utf8")
    message = client.message(
        index=topic+'/res', data=result
    )
    print("message sent:", json.dumps(message, indent=4))

def __spinner__():
    spinner = itertools.cycle(['-', '/', '|', '\\'])
    while True:
        sys.stdout.write(next(spinner))
        sys.stdout.flush()
        sys.stdout.write('\b')

# Process Ticket Data
def process_data(data):
    payload_str = json.loads(data)["payload"]
    # print("payload_str:", payload_str)
    message_id = client.get_message_id(payload_str)
    print("message_id:", message_id)
    message = client.get_message_data(message_id)
    # print("message:", json.dumps(message, indent=4))
    message_bytes = message["payload"]["indexation"][0]["data"]
    message_data = bytes(message_bytes).decode("utf-8")
    print("message_data:", message_data)
    # DB Check
    if message_data in valid_tickets:
        return send_result_to_door(1)
    return send_result_to_door(0)


# Receive MQTT msg
def __main__():
    client.subscribe_topic(pushTopic, process_data)
    __spinner__()

__spinner__()
