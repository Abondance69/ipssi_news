const History = require("../models/History");

exports.createHistory = async (req, res) => {
  try {
    const { title, description, url, image, source } = req.body;

    const article = await History.findOne({ title: title });

    if (article) {
      return res.status(409).json({ msg: "Articles already exists." });
    }

    await History.create({
      title,
      description,
      url,
      image,
      source,
    });

    res.status(201).json({ msg: "Article added with success." });
  } catch (error) {
    res.status(500).json({ msg: `Error : ${error.message}` });
  }
};

exports.getHistories = async (req, res) => {
  try {
    const article = await History.find();

    if (!article) {
      return res.status(404).json({ msg: "Articles not found." });
    }

    res.status(200).json({ articles: article });
  } catch (error) {
    res.status(500).json({ msg: `Error : ${error.message}` });
  }
};
