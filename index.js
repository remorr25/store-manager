const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  getRacks,
  getSKU,
  checkSKU,
  capacityRank,
  addToStore,
} = require("./function");

const app = express();

var corsOptions = {
  origin: "http://localhost",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("ok");
});

app.get("/racks", async (req, res) => {
  res.json(await getRacks());
});

app.get("/sku", async (req, res) => {
  res.json(await getSKU());
});

app.get("/racks-capacity", async (req, res) => {
  res.json(await capacityRank());
});

app.post("/checkSKU", async (req, res) => {
  res.json(await checkSKU(req.body.id));
});

app.post("/add", async (req, res) => {
  res.json(await addToStore(req.body));
});

app.listen(8080, () => {
  console.log(`Server is running on port ${8080}.`);
});
