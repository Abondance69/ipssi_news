const express = require("express");

const { getAllNews } = require("../controllers/newsController");
const { getHistory } = require("../controllers/historyController");

const router = express.Router();

router.get("/news", getAllNews);

module.exports = router;
