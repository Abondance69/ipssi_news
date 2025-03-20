// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Le prénom est requis"], // Le prénom est requis
    },
    lastname: {
        type: String,
        required: [true, "Le nom de famille est requis"], // Le nom de famille est requis
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, "L'email est invalide"],
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User", userSchema);
