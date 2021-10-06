const axios = require('axios').default;
const { ClientBuilder } = require('@iota/client');

// client will connect to testnet by default
const client = new ClientBuilder()
                    .node("https://api.lb-0.h.chrysalis-devnet.iota.cafe")
                    .localPow(true)
                    .build();

// client.getInfo().then(console.log).catch(console.error);


baseurl = "http://localhost:8000"

key = '123456'

function verifyDoor() {
    url = baseurl + "/" + key
    axios.get(url)
    .then(function (response) {
        console.log("success:: status:", response.status, "| data:", response.data);
        if (response.status == 200) {
            // server is reachable.
            if (response.data == true) {
                // Valid Ticket
                console.log("Valid Ticket");
            }
            else {
                console.log("In-Valid Ticket");
            }
        }
        else {
            console.log("Something went wrong. Please find the doorman!");
        }
    })
    .catch(function (error) {
        console.log("error:", error);
    });
}

// verifyDoor()

topic = "ticket/door/1"

async function verifyDoorMQTT() {
    const message = await client.message()
        .index(topic)
        .data(key)
        .submit();

    console.log("message:", message);
}

verifyDoorMQTT()


async function getValidation() {
    listenTopic = 'messages/indexation/' + topic + "/result"
    client.subscriber().topics([listenTopic]).subscribe((err, data) => {
        console.log(data);
        // To get the message id from messages `client.getMessageId(data.payload)` can be used
    })

    await new Promise(resolve => setTimeout(resolve, 1500));
    // unsubscribe from 'messages' topic, will continue to receive events for 'milestones/confirmed'
    client.subscriber().topics(['messages']).unsubscribe((err, data) => {
        console.log(data);
    })
}

// getValidation()
