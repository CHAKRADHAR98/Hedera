const { Client, TransferTransaction, TokenAssociateTransaction } = require("@hashgraph/sdk");
require("dotenv").config();

const client = Client.forTestnet();
client.setOperator(process.env.ACCOUNT_ID, process.env.PRIVATE_KEY);

async function transferToken(tokenId, buyerAccountId) {
    await new TokenAssociateTransaction()
        .setAccountId(buyerAccountId)
        .setTokenIds([tokenId])
        .execute(client);

    await new TransferTransaction()
        .addTokenTransfer(tokenId, process.env.ACCOUNT_ID, -1)
        .addTokenTransfer(tokenId, buyerAccountId, 1)
        .execute(client);

    console.log("Token transferred.");
}

transferToken("0.0.123", "0.0.456");
