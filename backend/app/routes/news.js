const express = require("express");
const { getNewsFromNewsAPI, getNewsFromNYTimes, getAllNews } = require("../controllers/newsController");

const router = express.Router();

router.get("/newsapi", getNewsFromNewsAPI);
router.get("/nytimes", getNewsFromNYTimes);
// router.get("/gnews", getNewsFromGNews);

router.get("/", getAllNews);

module.exports = router;
