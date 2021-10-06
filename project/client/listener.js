const axios = require('axios').default;
const { ClientBuilder } = require('@iota/client');

// client will connect to testnet by default
const client = new ClientBuilder()
                    .node("https://api.lb-0.h.chrysalis-devnet.iota.cafe")
                    .build();

// client.getInfo().then(console.log).catch(console.error);


baseurl = "http://localhost:8000"

key = '123456'

topic = "ticket/door/1"

async function getValidation() {
    listenTopic = 'messages/indexation/' + topic + "/res"
    client.subscriber().topics([listenTopic]).subscribe((err, data) => {
        // console.log("err:", err);
        console.log("data:", data);
        let messageId = client.getMessageId(data.payload)
        console.log('messageId:', messageId);

        client.getMessage().data(messageId).then(messagePayload => {
            let messageData = messagePayload.message.payload.data;

            let messageDecodedData = Buffer.from(messageData, "hex").toString("utf8")
            if (parseInt(messageDecodedData) == 0) {
                console.log("Sorry! You do not have a valid ticket!");
            }
            else {
                console.log("Welcome to Club Untangling IOTA!");
            }
        })
    })

    // await new Promise(resolve => setTimeout(resolve, 1500));
    // // unsubscribe from 'messages' topic, will continue to receive events for 'milestones/confirmed'
    // client.subscriber().topics(['messages']).unsubscribe((err, data) => {
    //     console.log(data);
    // })
}

getValidation()
