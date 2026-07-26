function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
      .setTitle('旗山醫院藥劑科 360度評估儀表板')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getSheetData() {
  try {
    // 試算表 ID
    const sheetId = '1wA2f-gUWKkaQ19JN7CRPDSpa7zY3jvw6C107sFdRgAU'; 
    
    // 開啟試算表並取得第一個工作表
    const sheet = SpreadsheetApp.openById(sheetId).getSheets()[0];
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return JSON.stringify({ error: '沒有資料或只有標題列' });
    }

    const headers = data[0].map(header => String(header).trim());
    const jsonData = [];

    // 將二維陣列轉為 JSON 物件陣列
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      let rowData = {};
      for (let j = 0; j < headers.length; j++) {
        rowData[headers[j]] = row[j];
      }
      jsonData.push(rowData);
    }
    
    return JSON.stringify(jsonData);
    
  } catch (e) {
    return JSON.stringify({ error: '無法讀取試算表，錯誤細節：' + e.toString() });
  }
}
