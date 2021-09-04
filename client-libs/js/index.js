const { ClientBuilder } = require('@iota/client');

// client will connect to testnet by default
// 1
const client = new ClientBuilder()
    .node('https://api.lb-0.testnet.chrysalis2.com')
    .localPow(true)
    .disableNodeSync()
    .build();

client.getInfo().then(console.log).catch(console.error)

// 2
function generateSeed() {
    const crypto = require('crypto');
    const seed = crypto.createHash('sha256').update(crypto.randomBytes(256)).digest('hex');
    console.log(seed);

    const mnemonic = client.generateMnemonic();
    console.log(mnemonic);

    const hexEncodedSeed = client.mnemonicToHexSeed(mnemonic);
    console.log(hexEncodedSeed);
}

var IOTA_SEED_SECRET = "67442a3f19ee1a625cb3526f5343c1d54498a69c86b3f745bbfc2ded454ccca7"

// 3
async function generateAddress() {
    const addresses = await client.getAddresses(IOTA_SEED_SECRET)
    .accountIndex(0)
    .range(0, 5)
    .get();

  console.log(addresses);
}

var ADDRESS = "atoi1qqeyrrd047smac59ty9grzkz90q6hcfl2u7efl9zhy5y43zad7lq6nvsrzl"

// 4
async function getBalance() {
    // Get the balance of a single known address
    console.log(
        await client.getAddressBalance(ADDRESS)
    );

    // Get the balance of addresses from an account
    const balance = await client.getBalance(IOTA_SEED_SECRET)
        .accountIndex(0)
        .initialAddressIndex(0)
        .get();

    console.log("Account balance: " + balance);
}

// Error: ledgerIndex

// 5
async function getOutputs() {
    const outputs = await client.getAddressOutputs(ADDRESS);
    console.log(outputs);
}

// 6
async function sendMessageEmpty() {
    const messageId = await client.message().submit();
    console.log(messageId);
    // 8e591c80a6c0b002e7520a1ef61ed11396e5b7137cd1c9cf3311af1baf937f1b
}

// 7
async function getMessageFromTips() {
    const tips = await client.getTips();
    const message_data = await client.getMessage().data(tips[0]);
    const message_metadata = await client.getMessage().metadata(tips[0]);
    console.log(message_metadata);
    console.log(message_data);
}

// 8
async function sendMessage() {
    const message = await client.message()
        .index('untanglingiota/js')
        .data('some new data')
        .submit();

    // message = "/light-1/1"

    console.log(message);
    // 82b77e8e7f8c557517c4064f6555cadac766b6f1df5fea69512cb8a6b80132be
}

// sendMessage()

// 9
async function getMessage(messageID) {
    let messagePayload = await client.getMessage().data(messageID)
    return messagePayload.message.payload.data;
}
