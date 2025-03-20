// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodeParser = require("body-parser");
const app = express();
const port = 8080;
require("dotenv").config();

const newsRoutes = require("./app/routes/news");

app.use("/api/news", newsRoutes);

const mongoose = require("mongoose");
const authRoutes = require("./app/routes/AuthRoutes.js"); // Assurez-vous que ce chemin est correct


// Middlewares
app.use(express.json());
app.use(bodeParser.json());
app.use(cors());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("🟢 MongoDB connecté"))
  .catch(err => console.log("🔴 Erreur de connexion MongoDB :", err));

// Routes
app.use("/api/auth", authRoutes); // Utilisation des routes d'authentification

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
