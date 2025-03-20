// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./app/routes/AuthRoutes.js"); // Assurez-vous que ce chemin est correct

const app = express();

// Middlewares
app.use(express.json());
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
