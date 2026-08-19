const db = require("../models");

async function getAllGenre(req, res) {
  try {
    const genre = await db.Genre.findAll();
    res.status(200).json(genre);
  } catch (err) {
    console.error("error fetching genre: ", err.message);
    res.status(500).json({ error: "failed to fetch genre" });
  }
}

async function getGenreById(req, res) {
  const { id } = req.params;
  try {
    const genre = await db.Genre.findByPk(id);
    if (!genre) {
      return res.status(404).json({ error: "genre tidak ditemukan" });
    }
    res.status(200).json(genre);
  } catch (err) {
    console.error("error fetching genre by id: ", err.message);
    res.status(500).json({ error: "failed to fetch genre by id" });
  }
}




