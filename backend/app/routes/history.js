const express = require("express");

const { createHistory, getHistories } = require("../controllers/historyController");

const router = express.Router();

router.get("/histories", getHistories);
router.post("/history", createHistory);

module.exports = router;
