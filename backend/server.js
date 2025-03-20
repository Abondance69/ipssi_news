const express = require("express");
const cors = require("cors");
const bodeParser = require("body-parser");
const app = express();
const port = 8080;
require("dotenv").config();

app.use(express.json());
app.use(bodeParser.json());
app.use(cors());

const newsRoutes = require("./app/routes/news");

app.use("/api/news", newsRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
