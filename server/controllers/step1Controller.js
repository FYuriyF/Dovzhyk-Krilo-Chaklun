// const GoogleSheetsService = require("../services/googleSheetsService");

// const SPREADSHEET_ID = "1FlJlC5Zhy_Lbo3CJ__fYL9O5s56KAYbivjYl25DHyZs";
// const sheetsService = new GoogleSheetsService(SPREADSHEET_ID);

const tempDataStore = {};

async function saveStep1Data(req, res) {
  const { fullName, email, callsign, phone, role } = req.body;

  console.log("Отримано дані з кроку №1:", {
    fullName,
    email,
    callsign,
    phone,
    role,
  });

  try {
    if (!fullName || !email || !role) {
      throw new Error("Не всі обов'язкові поля заповнені.");
    }

    // Зберігаємо дані тимчасово
    tempDataStore[email] = { fullName, email, callsign, phone, role };

    console.log("Дані з кроку №1 збережено тимчасово:", tempDataStore[email]);

    res.json({ success: true, message: "Дані з кроку №1 успішно збережено!" });
  } catch (error) {
    console.error("Помилка при збереженні даних з кроку №1:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Щось пішло не так." });
  }
}

module.exports = { saveStep1Data, tempDataStore };
