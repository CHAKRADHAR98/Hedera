const { Client, TokenCreateTransaction, TokenMintTransaction } = require("@hashgraph/sdk");
require("dotenv").config();

const client = Client.forTestnet();
client.setOperator(process.env.ACCOUNT_ID, process.env.PRIVATE_KEY);

async function createGoldToken(weight, price, purity) {
    const transaction = await new TokenCreateTransaction()
        .setTokenName("Gold Token")
        .setTokenSymbol("GOLD")
        .setTokenType(1) // Non-fungible
        .setTreasuryAccountId(process.env.ACCOUNT_ID)
        .setMaxTransactionFee(30)
        .freezeWith(client)
        .signWithOperator(client);

    const receipt = await transaction.execute(client).getReceipt(client);
    const tokenId = receipt.tokenId;

    console.log(`Token created: ${tokenId}`);

    const metadata = JSON.stringify({ weight, price, purity });
    await new TokenMintTransaction()
        .setTokenId(tokenId)
        .addMetadata(Buffer.from(metadata))
        .execute(client);

    console.log(`Token minted with metadata: ${metadata}`);
}

createGoldToken(10, 50000, "99.9%");
