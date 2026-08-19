const db = require("../models");

async function connectDatabase() {
  try {
    await db.sequelize.authenticate();
    console.log("yeyy, database berhasil terhubung");

    await db.sequelize.sync({ alter: true });
    console.log("database telah disinkronkan");
  } catch (err) {
    console.error("yaah, koneksi ke database gagal: ", err.message);
    process.exit(1);
  }
}

module.exports = connectDatabase;
