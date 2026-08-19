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






