const db = require("../models");

async function getAllKomik(req, res) {
  try {
    const komik = await db.Komik.findAll({
      include: [
        { model: db.Penulis, as: "penulis", attributes: ["id", "nama", "email"] },
        { model: db.Genre, as: "genre", through: { attributes: [] } },
      ],
    });
    res.status(200).json(komik);
  } catch (err) {
    console.error("error fetching komik: ", err.message);
    res.status(500).json({ error: "failed to fetch komik" });
  }
}

async function getKomikById(req, res) {
  const { id } = req.params;
  try {
    const komik = await db.Komik.findByPk(id, {
      include: [
        { model: db.Penulis, as: "penulis", attributes: ["id", "nama", "email"] },
        { model: db.Genre, as: "genre", through: { attributes: [] } },
      ],
    });
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
  const { judul, sinopsis, tahun_terbit, penulis_id, genre_ids } = req.body;
  try {
    const activePenulisId = penulis_id || (req.user && req.user.id);

    if (!judul || !sinopsis || !tahun_terbit || !activePenulisId) {
      return res.status(400).json({ error: "judul, sinopsis, tahun_terbit, dan penulis_id wajib diisi" });
    }

    const newKomik = await db.Komik.create({
      judul,
      sinopsis,
      tahun_terbit,
      penulis_id: activePenulisId,
    });

    if (genre_ids && Array.isArray(genre_ids)) {
      await newKomik.setGenre(genre_ids);
    }

    res.status(201).json(newKomik);
  } catch (err) {
    console.error("error creating komik: ", err.message);
    res.status(500).json({ error: "failed to create komik" });
  }
}

async function updateKomik(req, res) {
  const { id } = req.params;
  const { judul, sinopsis, tahun_terbit, penulis_id, genre_ids } = req.body;
  try {
    const komik = await db.Komik.findByPk(id);
    if (!komik) {
      return res.status(404).json({ error: "komik not found" });
    }

    if (judul !== undefined) komik.judul = judul;
    if (sinopsis !== undefined) komik.sinopsis = sinopsis;
    if (tahun_terbit !== undefined) komik.tahun_terbit = tahun_terbit;
    if (penulis_id !== undefined) komik.penulis_id = penulis_id;
    await komik.save();

    if (genre_ids && Array.isArray(genre_ids)) {
      await komik.setGenre(genre_ids);
    }

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