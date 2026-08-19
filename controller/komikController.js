const db = require("../models");

async function getAllKomik(req, res) {
  try {
    const komik = await db.Komik.findAll();
    res.status(200).json(komik);
  } catch (err) {
    console.error("error fetching komik: ", err.message);
    res.status(500).json({ error: "failed to fetch komik" });
  }
}

async function getKomikById(req, res) {
  const { id } = req.params;
  try {
    const komik = await db.Komik.findByPk(id);
    if (!komik) {
      return res.status(404).json({ error: "komik not found" });
    }
    res.status(200).json(komik);
  } catch (err) {
    console.error("error fetching komik by id: ", err.message);
    res.status(500).json({ error: "failed to fetch komik by id" });
  }
}

async function createKomik(req, res) {
  const { judul, sinopsis, tahun_terbit, penulis_id } = req.body;
  try {
    const newKomik = await db.Komik.create({ judul, sinopsis, tahun_terbit, penulis_id });
    res.status(201).json(newKomik);
  } catch (err) {
    console.error("error creating komik: ", err.message);
    res.status(500).json({ error: "failed to create komik" });
  }
}

async function updateKomik(req, res) {
  const { id } = req.params;
  const { judul, sinopsis, tahun_terbit, penulis_id } = req.body;
  try {
    const komik = await db.Komik.findByPk(id);
    if (!komik) {
      return res.status(404).json({ error: "komik not found" });
    }
    komik.judul = judul;
    komik.sinopsis = sinopsis;
    komik.tahun_terbit = tahun_terbit;
    komik.penulis_id = penulis_id;
    await komik.save();
    res.status(200).json(komik);
  } catch (err) {
    console.error("error updating komik", err.message);
    res.status(500).json({ error: "failed to update komik" });
  }
}

async function deleteKomik(req, res) {
  const { id } = req.params;
  try {
    const komik = await db.Komik.findByPk(id);
    if (!komik) {
      return res.status(404).json({ error: "komik not found" });
    }
    await komik.destroy();
    res.status(200).json({ message: "komik deleted successfully" });
  } catch (err) {
    console.error("error deleting komik", err.message);
    res.status(500).json({ error: "failed to delete komik" });
  }
}

module.exports = {
  getAllKomik,
  getKomikById,
  createKomik,
  updateKomik,
  deleteKomik,
};