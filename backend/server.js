const express = require("express");
const cors = require("cors");
const bodeParser = require("body-parser");
const app = express();

require("dotenv").config();

const authRoutes = require("./app/routes/auth.js");
const newsRoutes = require("./app/routes/news");

app.use("/api/news", newsRoutes);
app.use("/api/auth", authRoutes);

app.use(express.json());
app.use(bodeParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = 8080;
app.listen(port, () => console.log(`🚀 Serveur démarré sur le port ${port}`));
