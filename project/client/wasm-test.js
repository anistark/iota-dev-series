const { ClientBuilder } = require('@iota/client-wasm/node')

SEED = "67442a3f19ee1a625cb3526f5343c1d54498a69c86b3f745bbfc2ded454ccca7"

async function run() {
    let client = await new ClientBuilder()
        .node("https://api.lb-0.h.chrysalis-devnet.iota.cafe")
        .build();
    
    const addresses = await client.getAddresses(SEED)
    .accountIndex(0)
    .range(0, 1)
    .get();
    
    console.log(addresses);
}

run()
