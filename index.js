const express = require("express");
const connectDatabase = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let databaseReady = false;
let databasePromise = null;

// Middleware untuk memastikan koneksi database
app.use(async (req, res, next) => {
  try {
    if (!databaseReady) {
      if (!databasePromise) {
        databasePromise = connectDatabase();
      }
      await databasePromise;
      databaseReady = true;
    }
    next();
  } catch (error) {
    console.error("Database initialization failed:", error.message);
    databasePromise = null; // Reset agar request berikutnya bisa mencoba koneksi ulang
    res.status(500).json({ error: "Failed to initialize database" });
  }
});

// Routing API
app.use("/api", require("./routes/api"));

// Jalankan Server HTTP
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;