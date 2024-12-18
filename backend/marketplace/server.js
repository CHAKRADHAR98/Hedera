const express = require("express");
const app = express();
app.use(express.json());

const listings = [];

app.post("/list-token", (req, res) => {
    const { tokenId, weight, price, purity } = req.body;
    listings.push({ tokenId, weight, price, purity });
    res.send("Token listed successfully.");
});

app.get("/listings", (req, res) => {
    res.json(listings);
});

app.listen(3000, () => console.log("Marketplace API running on port 3000"));
