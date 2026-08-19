const express = require("express");
const router = express.Router();

const penulisController = require("../controller/penulisController");
const komikController = require("../controller/komikController");
const genreController = require("../controller/genreController");
const authMiddleware = require("../middleware/authMiddleware");

// public
router.post("/register", penulisController.register);
router.post("/login", penulisController.login);


// protected
router.get("/komik", authMiddleware, komikController.getAllKomik);
router.get("/komik/:id", authMiddleware, komikController.getKomikById);
router.post("/komik", authMiddleware, komikController.createKomik);
router.put("/komik/:id", authMiddleware, komikController.updateKomik);
router.delete("/komik/:id", authMiddleware, komikController.deleteKomik);

router.get("/genre", authMiddleware, genreController.getAllGenre);
router.get("/genre/:id", authMiddleware, genreController.getGenreById);
router.post("/genre", authMiddleware, genreController.createGenre);
router.put("/genre/:id", authMiddleware, genreController.updateGenre);
router.delete("/genre/:id", authMiddleware, genreController.deleteGenre);

module.exports = router;
