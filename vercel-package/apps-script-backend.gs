// === Paste this into Extensions > Apps Script, then Deploy > New deployment > Web app ===
// Execute as: Me
// Who has access: Anyone
//
// Sheet header row (row 1) must be, in this exact order:
// Timestamp | Name | Employee Code | Office | Team | Size | Month

const SHEET_NAME = 'Submissions';

// ⚠️ Must match ADMIN_KEY in the HTML file exactly.
const ADMIN_KEY = 'quynhchi';

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name,
    data.empcode,
    data.office,
    data.team,
    data.size,
    data.month
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  // Require the admin key as a query param: ?key=change-this-password
  // Without it (or with a wrong value), no submission data is returned.
  const key = e.parameter.key;
  if (key !== ADMIN_KEY) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'unauthorized' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const rows = sheet.getDataRange().getValues();
  rows.shift(); // remove header row

  const entries = rows
    .filter(r => r[1]) // skip empty rows
    .map(r => ({
      ts: new Date(r[0]).getTime(),
      name: r[1],
      empcode: r[2],
      office: r[3],
      team: r[4],
      size: r[5],
      month: r[6]
    }));

  return ContentService
    .createTextOutput(JSON.stringify(entries))
    .setMimeType(ContentService.MimeType.JSON);
}
