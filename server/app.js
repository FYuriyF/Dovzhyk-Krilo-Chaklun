const express = require("express");
const cors = require("cors");
const path = require("path");
const step1Routes = require("./routes/step1Routes");
const step2Routes = require("./routes/step2Routes");

const app = express();
app.use(cors());
app.use(express.json());

// Підключаємо маршрути
app.use("/api", step1Routes); // Маршрути для кроку №1
app.use("/api", step2Routes); // Маршрути для кроку №2

// Обробка статичних файлів React-додатку (для production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

// Запуск сервера
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});
