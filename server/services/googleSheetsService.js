const { google } = require("googleapis");
const CREDENTIALS = require("../credentials.json");

class GoogleSheetsService {
  constructor(spreadsheetId) {
    this.spreadsheetId = spreadsheetId;
  }

  async authenticate() {
    console.log("Автентифікація з Google API...");
    const auth = new google.auth.GoogleAuth({
      credentials: CREDENTIALS,
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    return await auth.getClient();
  }

  async getHeaders(sheetName) {
    console.log("Отримання заголовків колонок для листа:", sheetName);
    const client = await this.authenticate();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const response = await googleSheets.spreadsheets.values.get({
      spreadsheetId: this.spreadsheetId,
      range: `${sheetName}!1:1`,
    });

    console.log("Заголовки колонок отримано:", response.data.values[0]);
    return response.data.values[0];
  }

  async appendData(sheetName, data) {
    console.log("Додавання нового рядка до листа:", sheetName);
    const client = await this.authenticate();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    await googleSheets.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range: sheetName,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [data],
      },
    });

    console.log("Рядок успішно додано до таблиці");
  }
}

module.exports = GoogleSheetsService;
