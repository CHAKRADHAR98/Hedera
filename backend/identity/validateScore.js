const { Client, TopicMessageQuery } = require("@hashgraph/sdk");
require("dotenv").config();

const client = Client.forTestnet();
client.setOperator(process.env.ACCOUNT_ID, process.env.PRIVATE_KEY);

async function validateScore(userId) {
    const topicId = process.env.TOPIC_ID;
    let scoreValid = false;

    await new TopicMessageQuery()
        .setTopicId(topicId)
        .subscribe(client, (message) => {
            const data = JSON.parse(message.contents);
            if (data.userId === userId && data.score >= 75) {
                scoreValid = true;
                console.log("Access granted to the marketplace.");
            }
        });

    if (!scoreValid) console.log("Access denied.");
}

validateScore("user123");
