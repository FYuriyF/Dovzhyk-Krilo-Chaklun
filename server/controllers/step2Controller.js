const GoogleSheetsService = require("../services/googleSheetsService");
const { tempDataStore } = require("./step1Controller");

const SPREADSHEET_ID = "1FlJlC5Zhy_Lbo3CJ__fYL9O5s56KAYbivjYl25DHyZs";
const sheetsService = new GoogleSheetsService(SPREADSHEET_ID);

async function saveStep2Data(req, res) {
  const {
    startDate,
    endDate,
    trainingPurpose,
    militaryUnit,
    brigadeNumber,
    commanderName,
    commanderPhone,
    email,
  } = req.body;

  console.log("Отримано дані з кроку №2:", {
    startDate,
    endDate,
    trainingPurpose,
    militaryUnit,
    brigadeNumber,
    commanderName,
    commanderPhone,
    email,
  });

  try {
    if (!email) {
      throw new Error("Email не надано. Неможливо знайти дані з кроку №1.");
    }

    // Отримуємо дані з кроку №1 за email
    const step1Data = tempDataStore[email];
    if (!step1Data) {
      throw new Error("Дані з кроку №1 не знайдені.");
    }

    console.log("Дані з кроку №1 знайдено:", step1Data);

    // Видаляємо тимчасові дані після їх використання
    delete tempDataStore[email];
    console.log("Тимчасові дані видалено для email:", email);

    // Отримуємо заголовки колонок
    const headers = await sheetsService.getHeaders("Контактні данні");
    console.log("Заголовки колонок отримано:", headers);

    // Створюємо новий рядок для додавання
    const newRow = headers.map((header) => {
      if (header === "ПІБ") return step1Data.fullName;
      if (header === "Email") return step1Data.email;
      if (header === "Позивний") return step1Data.callsign || "";
      if (header === "Телефон з Signal") return step1Data.phone;
      if (header === "Старший групи" && step1Data.role === "Старший групи")
        return step1Data.fullName;
      if (header === "Дата початку занять") return startDate;
      if (header === "Дата закінчення занять") return endDate;
      if (header === "Ціль навчання") return trainingPurpose;
      if (header === "Військова частина") return militaryUnit;
      if (header === "Номер бригади") return brigadeNumber;
      if (header === "ПІБ Командира") return commanderName;
      if (header === "Телефон Командира") return commanderPhone;
      return ""; // Пусті значення для інших колонок
    });

    console.log("Новий рядок для додавання:", newRow);

    // Додаємо новий рядок до таблиці
    await sheetsService.appendData("Контактні данні", newRow);
    console.log("Дані успішно додані до таблиці");

    res.json({ success: true, message: "Дані успішно додані!" });
  } catch (error) {
    console.error("Помилка при додаванні даних до таблиці:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Щось пішло не так." });
  }
}

module.exports = { saveStep2Data };
