const express = require("express");
const cors = require("cors");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Налаштування Google Таблиці
const SPREADSHEET_ID = "1FlJlC5Zhy_Lbo3CJ__fYL9O5s56KAYbivjYl25DHyZs"; // Заміни на ID своєї таблиці
const CREDENTIALS = require("./credentials.json"); // Шлях до ключа API

// Функція для додавання даних до Google Таблиці
async function addToSheet(fullName, email) {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
  console.log("Підключено до Google Таблиці з ID:", SPREADSHEET_ID);

  // Автентифікація за допомогою сервісного акаунта
  try {
    await doc.useServiceAccountAuth({
      client_email: CREDENTIALS.client_email,
      private_key: CREDENTIALS.private_key,
    });
    console.log("Автентифікація успішна");
  } catch (authError) {
    console.error("Помилка автентифікації:", authError);
    throw new Error("Помилка автентифікації");
  }

  // Завантаження інформації про таблицю
  try {
    await doc.loadInfo();
    console.log("Інформація про таблицю завантажена");
  } catch (loadError) {
    console.error("Помилка завантаження інформації про таблицю:", loadError);
    throw new Error("Помилка завантаження інформації про таблицю");
  }

  // Отримуємо лист "Контактні данні"
  const sheet = doc.sheetsByTitle["Контактні данні"];
  if (!sheet) {
    console.error("Лист 'Контактні данні' не знайдено.");
    throw new Error("Лист 'Контактні данні' не знайдено.");
  }
  console.log("Лист 'Контактні данні' знайдено");

  // Перевірка наявності заголовків
  if (sheet.headerValues.length === 0) {
    console.log("Заголовки відсутні. Додаємо заголовки...");
    try {
      await sheet.setHeaderRow(["КУРСАНТ ПІБ", "Email"]);
      console.log("Заголовки успішно додані");
    } catch (headerError) {
      console.error("Помилка додавання заголовків:", headerError);
      throw new Error("Помилка додавання заголовків");
    }
  }

  // Додаємо дані до листа
  try {
    await sheet.addRow({ "КУРСАНТ ПІБ": fullName, Email: email });
    console.log("Дані успішно додані до таблиці");
  } catch (addRowError) {
    console.error("Помилка додавання рядка:", addRowError);
    throw new Error("Помилка додавання рядка");
  }
}

// Маршрут для обробки POST-запитів
app.post("/submit", async (req, res) => {
  const { fullName, email } = req.body;
  console.log("Отримано дані:", { fullName, email }); // Логування отриманих даних

  try {
    await addToSheet(fullName, email);
    console.log("Дані успішно додані до таблиці"); // Логування успіху
    res.json({ success: true, message: "Дані успішно додані!" });
  } catch (error) {
    console.error("Помилка при додаванні до таблиці:", error); // Логування помилки
    res.status(500).json({ success: false, message: "Щось пішло не так." });
  }
});

// Обробка статичних файлів React-додатку (для production)
if (process.env.NODE_ENV === "production") {
  // Вказуємо шлях до папки зі збіркою React-додатку
  app.use(express.static(path.join(__dirname, "client/build")));

  // Обробка всіх інших маршрутів
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Запуск сервера
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});
