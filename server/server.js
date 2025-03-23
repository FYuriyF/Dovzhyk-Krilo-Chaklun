// const express = require("express");
// const cors = require("cors");
// const { google } = require("googleapis");
// const path = require("path");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Налаштування Google Таблиці
// const SPREADSHEET_ID = "1FlJlC5Zhy_Lbo3CJ__fYL9O5s56KAYbivjYl25DHyZs"; // Заміни на ID своєї таблиці
// const CREDENTIALS = require("./credentials.json"); // Шлях до ключа API

// // Функція для додавання даних до Google Таблиці
// async function addToSheet(fullName, email, callsign, phone, role) {
//   try {
//     // Автентифікація
//     const auth = new google.auth.GoogleAuth({
//       credentials: CREDENTIALS,
//       scopes: "https://www.googleapis.com/auth/spreadsheets",
//     });

//     // Створення клієнта для автентифікації
//     const client = await auth.getClient();

//     // Ініціалізація Google Sheets API
//     const googleSheets = google.sheets({ version: "v4", auth: client });

//     // Отримання заголовків колонок
//     const headersResponse = await googleSheets.spreadsheets.values.get({
//       spreadsheetId: SPREADSHEET_ID,
//       range: "Контактні данні!1:1", // Отримуємо перший рядок (заголовки)
//     });

//     const headers = headersResponse.data.values[0]; // Заголовки колонок
//     console.log("Заголовки колонок:", headers); // Логуємо заголовки

//     // Нормалізація назв колонок (видалення зайвих пробілів)
//     const normalizedHeaders = headers.map((header) => header.trim());

//     // Знаходження індексів колонок за назвами
//     const fullNameColumnIndex = headers.indexOf("ПІБ"); // Шукаємо колонку "ПІБ"
//     const emailColumnIndex = headers.indexOf("Email"); // Шукаємо колонку "Email"
//     const callsignColumnIndex = headers.indexOf("Позивний"); // Шукаємо колонку "Позивний"
//     const phoneColumnIndex = headers.indexOf("Телефон з Signal"); // Шукаємо колонку "Телефон з Signal"
//     const groupLeaderColumnIndex = headers.indexOf("Старший групи"); // Шукаємо колонку "Старший групи"

//     console.log("Індекс колонки 'ПІБ':", fullNameColumnIndex); // Логуємо індекс
//     console.log("Індекс колонки 'Email':", emailColumnIndex); // Логуємо індекс
//     console.log("Індекс колонки 'Позивний':", callsignColumnIndex); // Логуємо індекс
//     console.log("Індекс колонки 'Телефон з Signal':", phoneColumnIndex); // Логуємо індекс
//     console.log("Індекс колонки 'Старший групи':", groupLeaderColumnIndex); //Логуємо індекс
//     console.log("Нормалізовані заголовки:", normalizedHeaders); // Нормалізовані заголовки

//     // Перевірка, чи знайдені колонки
//     if (
//       fullNameColumnIndex === -1 ||
//       emailColumnIndex === -1 ||
//       groupLeaderColumnIndex === -1
//     ) {
//       throw new Error(
//         "Колонки 'ПІБ', 'Email' або 'Старший групи не знайдені'."
//       );
//     }

//     // Отримання останнього рядка з даними
//     const dataResponse = await googleSheets.spreadsheets.values.get({
//       spreadsheetId: SPREADSHEET_ID,
//       range: "Контактні данні", // Отримуємо всі дані з листа
//     });

//     const lastRowIndex = dataResponse.data.values
//       ? dataResponse.data.values.length + 1
//       : 1;

//     // Створення масиву даних для нового рядка
//     const newRow = headers.map((header, index) => {
//       if (index === fullNameColumnIndex) return fullName; // Додаємо ПІБ
//       if (index === emailColumnIndex) return email; // Додаємо Email
//       if (index === callsignColumnIndex) return callsign || ""; // Додаємо Позивний
//       if (index === phoneColumnIndex) return phone; // Додаємо Телефон з Signal
//       if (index === groupLeaderColumnIndex && role === "Старший групи")
//         return fullName; // Додаємо ПІБ Старшого групи
//       return ""; // Пусті значення для інших колонок
//     });

//     // Додавання нового рядка
//     await googleSheets.spreadsheets.values.append({
//       spreadsheetId: SPREADSHEET_ID,
//       range: "Контактні данні", // Діапазон для додавання
//       valueInputOption: "USER_ENTERED",
//       resource: {
//         values: [newRow], // Дані для додавання
//       },
//     });

//     console.log("Дані успішно додані до таблиці");
//   } catch (error) {
//     console.error("Помилка при додаванні до таблиці:", error);
//     throw new Error("Помилка при додаванні до таблиці");
//   }
// }

// // Маршрут для обробки POST-запитів
// app.post("/submit", async (req, res) => {
//   const { fullName, email, callsign, phone, role } = req.body;
//   console.log("Отримано дані:", { fullName, email, callsign, phone, role }); // Логування отриманих даних

//   try {
//     await addToSheet(fullName, email, callsign, phone, role);
//     console.log("Дані успішно додані до таблиці"); // Логування успіху
//     res.json({ success: true, message: "Дані успішно додані!" });
//   } catch (error) {
//     console.error("Помилка при додаванні до таблиці:", error); // Логування помилки
//     res.status(500).json({ success: false, message: "Щось пішло не так." });
//   }
// });

// // Обробка статичних файлів React-додатку (для production)
// if (process.env.NODE_ENV === "production") {
//   // Вказуємо шлях до папки зі збіркою React-додатку
//   app.use(express.static(path.join(__dirname, "client/build")));

//   // Обробка всіх інших маршрутів
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client/build", "index.html"));
//   });
// }

// // Запуск сервера
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Сервер запущено на http://localhost:${PORT}`);
// });
