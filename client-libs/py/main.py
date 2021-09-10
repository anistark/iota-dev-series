import iota_client
import json
import os
import hashlib

client = iota_client.Client()

# # 1
# print(json.dumps(client.get_info(), indent=2))

# 2
# rnd_seed = hashlib.sha256(os.urandom(256)).hexdigest()
# print(rnd_seed)

IOTA_SEED_SECRET = 'e9af28fe35b68db0332f42a0437e7f3ba5d0f91c357c828da33a035c3c9a5edd'

if not IOTA_SEED_SECRET:
    raise Exception("Please define environment variable called `IOTA_SEED_SECRET`")

# 3
# address_changed_list = client.get_addresses(
#     seed=IOTA_SEED_SECRET,
#     account_index=0,
#     input_range_begin=0,
#     input_range_end=10,
#     get_all=True
# )
# print(address_changed_list)

ADDRESS = 'atoi1qzgug6u4hs2rp68dspum9mlxkvstz3yyyjs8r4jgu9tjsxr8hhzjsp4sp92'

# 4
# print("Return a balance for a single address:")
# print(
#     client.get_address_balance(ADDRESS)
# )

# 5
# print("Return a balance for the given seed and account_index:")
# print(
#     client.get_balance(
#         seed=IOTA_SEED_SECRET,
#         account_index=0,
#         initial_address_index=0
#     )
# )

# 6
# outputs = client.get_address_outputs(ADDRESS)
# print("outputs:", outputs)
# for output in outputs:
#     print(f"Output index: {output['index']}; raw transaction id: {output['transaction_id']}")
#     encoded_hex = "".join(f"{i:0>2x}" for i in output["transaction_id"] + list(int(output["index"]).to_bytes(2, 'little')))
#     print(f"`output_id` encoded in hex: {encoded_hex}")

# 7
def message():
    return client.message()

# 8
def get_message(message_id):
    message = client.get_message_data(message_id)
    message_meta = client.get_message_metadata(message_id)
    # print("Message meta data:", json.dumps(message_meta, indent=2))
    # 
    message_bytes = message["payload"]["indexation"][0]["data"]
    # print("message_bytes:", message_bytes)
    message_data = bytes(message_bytes).decode('utf-8')
    # print("message_data:", message_data)
    return message_data

# 9
def send_indexed_message(msg):
    # encoding utf string into list of bytes
    some_data = msg.encode("utf8")

    message = client.message(
        index="iotadev/series/js", data=some_data
    )
    return message


def run():
    res = get_message("9a9a184e4f38013b572ca696065e48931a993e260fd7e0a5e58eb11bdce68f60")
    # res = send_indexed_message("UnTangling IOTA")
    print(json.dumps(res, indent=2))

run()
