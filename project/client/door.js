const { ClientBuilder } = require('@iota/client');

// client will connect to testnet by default
const client = new ClientBuilder()
                    .node("https://api.lb-0.h.chrysalis-devnet.iota.cafe")
                    .localPow(true)
                    .build();

SEED = "67442a3f19ee1a625cb3526f5343c1d54498a69c86b3f745bbfc2ded454ccca7"

// 1. Generate a new Address
async function generateAddress() {
    const addresses = await client.getAddresses(SEED)
        .accountIndex(0)
        .range(0, 1)
        .get();

    console.log("address for user X:", addresses[0]);
}

ADDRESS = "atoi1qqeyrrd047smac59ty9grzkz90q6hcfl2u7efl9zhy5y43zad7lq6nvsrzl"

// 2. Verify Balance of this Address.
async function getBalance(addr) {
    addressBalance = await client.getAddressBalance(addr)
    console.log("addressBalance:", addressBalance.balance);
    if(addressBalance.balance == 0) {
        getBalance(addr)
    }
    else {
        console.log('Funds Received!');
        return
    }
}

getBalance(ADDRESS)
