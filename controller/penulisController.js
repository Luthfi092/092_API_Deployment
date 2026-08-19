const db = require("../models");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const Penulis = db.Penulis;

async function register(req, res) {
  try {
    const { nama, email, password } = req.body;
    if (!nama || !email || !password) {
      return res
        .status(400)
        .json({ message: "nama, email, dan password wajib diisi." });
    }

    const existingPenulis = await Penulis.findOne({
      where: { email },
    });

    if (existingPenulis) {
      return res.status(409).json({ message: "email sudah terdaftar." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const penulis = await Penulis.create({
      nama,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "alhamdulillah registrasi penulis berhasil",
      data: {
        id: penulis.id,
        nama: penulis.nama,
        email: penulis.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email dan password wajib diisi." });
    }

    const penulis = await Penulis.findOne({
      where: { email },
    });

    if (!penulis) {
      return res.status(401).json({ message: "email atau password salah." });
    }

    const isMatch = await bcrypt.compare(password, penulis.password);
    if (!isMatch) {
      return res.status(401).json({ message: "email atau password salah." });
    }

    const token = jwt.sign(
      {
        id: penulis.id,
        nama: penulis.nama,
        email: penulis.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );

    return res.status(200).json({
      message: "alhamdulillah login berhasil",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  register,
  login,
};