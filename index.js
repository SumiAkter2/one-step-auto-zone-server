const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hnxcxtq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const servicesCollection = client.db("autoZone").collection("services");
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = await servicesCollection.find(query).toArray();
      res.send(cursor);
    });
  } finally {
  }
}
run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("One step Auto Zone");
});
app.listen(port, () => {
  console.log("running", port);
});
