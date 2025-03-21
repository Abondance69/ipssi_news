// utils/axiosInstance.js
const axios = require('axios');

const axiosInstance = axios.create({
    timeout: 10000, // Timeout de 10 secondes
    headers: {
        'Content-Type': 'application/json',
    },
});

module.exports = axiosInstance;
