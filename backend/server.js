const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

require("dotenv").config();

const authRoutes = require("./app/routes/auth.js");
const newsRoutes = require("./app/routes/news");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(bodyParser.json());

app.use("/api/news", newsRoutes);
app.use("/api/auth", authRoutes);

const port = 8080;
app.listen(port, () => console.log(`🚀 Serveur démarré sur le port ${port}`));
