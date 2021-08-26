const { ClientBuilder } = require('@iota/client');

// client will connect to testnet by default
// 1
const client = new ClientBuilder()
    .node('https://chrysalis-nodes.iota.org/')
    .localPow(true)
    .disableNodeSync()
    .build();

async function listen() {
    client.subscriber().topics(['messages/indexation/untanglingiota/js']).subscribe((err, data) => {
        console.log(data);
        let messageId = client.getMessageId(data.payload)
        console.log('messageId:', messageId);

        client.getMessage().data(messageId).then(messagePayload => {
            let messageData = messagePayload.message.payload.data;

            let messageDecodedData = Buffer.from(messageData, "hex").toString("utf8")
            console.log('messageDecodedData:', messageDecodedData);

        })
    })
}

listen()
