const express = require("express");
const cors = require("cors");
const Transaction = require("./models/transaction");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();

dotenv.config({ path: "./.env" });
app.use(cors());
app.use(express.json());

const password = process.env.PASS;

app.post("/api/transaction", async (req, res) => {
  const { name, description, datetime, price } = req.body;
  const transaction = await Transaction.create({
    name,
    price,
    description,
    datetime: new Date(datetime),
  });
  res.json(transaction);
});

app.get('/api/transactions', async (req,res) => {
  const transactions = await Transaction.find();
  res.json(transactions)
})

app.listen(9999, async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://FIRO:${password}@cluster0.dijhs3y.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("ok");
  } catch (error) {
    console.log(error);
  }
});
