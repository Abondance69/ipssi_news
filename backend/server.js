const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const connectDB = require("./app/config/database");

require("dotenv").config();

connectDB();

const CONFIG = require("./app/config/config");

const newsRoutes = require("./app/routes/news");
const historyRoutes = require("./app/routes/history");

app.use(
  cors({
    origin: CONFIG.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(bodyParser.json());

app.use("/api", newsRoutes);
app.use("/api", historyRoutes);

const port = 8080;
app.listen(port, () => console.log(`🚀 Serveur démarré sur le port ${port}`));
