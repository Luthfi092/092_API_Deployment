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




