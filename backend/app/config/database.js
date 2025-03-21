require("dotenv").config();

const mongoose = require("mongoose");

const DB_CLUSTER = process.env.DB_CLUSTER;
const DB_NAME = process.env.DB_NAME;

const connectDB = async () => {
  try {
    await mongoose.connect(`${DB_CLUSTER}`, {});
    console.log("✅ MongoDB connecté avec succès !");
  } catch (error) {
    console.error("❌ Erreur de connexion à MongoDB :", error);
    process.exit(1);
  }
};

module.exports = connectDB;
