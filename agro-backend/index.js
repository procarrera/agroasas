require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();

const uri = process.env.MONGO_URL;

MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
  if (err) return console.log(err);
  db = client.db("agroasas"); // coloque o nome do seu DB

  app.listen(3333, () => {
    console.log("Server running on port 3333");
  });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://agroasas.com.br"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.status(301).redirect("https://agroasas.com.br/");
});

app.post("/register", (req, res) => {
  console.log(req.body);
  db.collection("agroasas").save(req.body, (err, result) => {
    if (err) {
      return res.end("ERRO");
    }
    res.status(200).json({ message: "tudo certo" });
    // console.log("dados cadastrados, redirecionar");
    // res.status(301).redirect("https://agroasas-lp.now.sh/");
  });
});
