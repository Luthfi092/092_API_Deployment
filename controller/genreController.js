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

async function createGenre(req, res) {
  const { nama_genre } = req.body;
  try {
    const newGenre = await db.Genre.create({ nama_genre });
    res.status(201).json(newGenre);
  } catch (err) {
    console.error("error creating genre: ", err.message);
    res.status(500).json({ error: "failed to create genre" });
  }
}

async function updateGenre(req, res) {
  const { id } = req.params;
  const { nama_genre } = req.body;
  try {
    const genre = await db.Genre.findByPk(id);
    if (!genre) {
      return res.status(404).json({ error: "genre not found" });
    }
    genre.nama_genre = nama_genre;
    await genre.save();
    res.status(200).json(genre);
  } catch (err) {
    console.error("error updating genre", err.message);
    res.status(500).json({ error: "failed to update genre" });
  }
}

async function deleteGenre(req, res) {
  const { id } = req.params;
  try {
    const genre = await db.Genre.findByPk(id);
    if (!genre) {
      return res.status(404).json({ error: "genre not found" });
    }
    await genre.destroy();
    res.status(200).json({ message: "genre deleted successfully" });
  } catch (err) {
    console.error("error deleting genre", err.message);
    res.status(500).json({ error: "failed to delete genre" });
  }
}

module.exports = {
  getAllGenre,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
};