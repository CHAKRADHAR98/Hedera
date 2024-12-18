const { Client, TopicMessageSubmitTransaction } = require("@hashgraph/sdk");
require("dotenv").config();

const client = Client.forTestnet();
client.setOperator(process.env.ACCOUNT_ID, process.env.PRIVATE_KEY);

async function registerIdentity(userId, score) {
    const topicId = process.env.TOPIC_ID;
    const message = JSON.stringify({ userId, score, timestamp: new Date().toISOString() });

    const transaction = await new TopicMessageSubmitTransaction()
        .setTopicId(topicId)
        .setMessage(message)
        .execute(client);

    const receipt = await transaction.getReceipt(client);
    console.log(`Identity registered with consensus timestamp: ${receipt.consensusTimestamp}`);
}

registerIdentity("user123", 85); // Example
