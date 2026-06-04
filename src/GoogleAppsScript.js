/**
 * GOOGLE APPS SCRIPT FOR EQ AUDIT RESULTS SYNC
 * 
 * INSTRUCTIONS FOR SETTING UP GOOGLE SHEETS:
 * 
 * 1. Open Google Sheets (https://sheets.google.com).
 * 2. Create a new empty spreadsheet or open an existing one.
 * 3. Give your spreadsheet a name (e.g., "EQ Audit Submissions").
 * 4. In the top menu, go to Extension -> Apps Script.
 * 5. Delete any code in the editor (specifically code in Code.gs) and paste this entire script.
 * 6. Click the Save icon (floppy disk) at the top of the editor.
 * 7. Click the "Deploy" button (top right) -> "New deployment".
 * 8. Click the Select type (gear icon) next to "Deploy" and choose "Web app".
 * 9. Fill in the fields:
 *    - Description: "EQ Audit Form Submission API"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (CRITICAL: Choose "Anyone", NOT "Anyone with a Google account" to allow submissions from the website).
 * 10. Click "Deploy".
 * 11. Authorize access if prompted (Google will show a warning saying the app isn't verified; click "Advanced" -> "Go to Untitled Project (unsafe)" -> "Allow").
 * 12. Copy the "Web app URL" (it ends with /exec).
 * 13. Paste this URL in your react project code inside `src/pages/Assessment.tsx` (replace the placeholder URL or we will provide a configuration setting where you can insert it).
 */

function doPost(e) {
  var headers = [
    "Timestamp", 
    "Name", 
    "Email", 
    "Phone", 
    "Overall Score", 
    "Result Profile", 
    "Emotional Awareness Score", 
    "Emotional Regulation Score", 
    "Pattern Recognition Score", 
    "Relational Intelligence Score", 
    "Inner Alignment Score", 
    "Resilience & Surrender Score"
  ];

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Add headers if the sheet is completely blank
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      // Format headers: bold, slightly larger font
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#f3f3f3");
    }
    
    var rowData = [
      new Date(),
      data.name,
      data.email,
      data.phone,
      data.score,
      data.resultTitle,
      data.dimensionScores["Emotional Awareness"] || 0,
      data.dimensionScores["Emotional Regulation"] || 0,
      data.dimensionScores["Pattern Recognition"] || 0,
      data.dimensionScores["Relational Intelligence"] || 0,
      data.dimensionScores["Inner Alignment"] || 0,
      data.dimensionScores["Resilience & Surrender"] || 0
    ];
    
    sheet.appendRow(rowData);
    
    // Return a JSON response letting the client know it succeeded
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "success", 
      message: "Data successfully saved to Google Sheets." 
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*"); // Allow browser requests

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "error", 
      message: error.toString() 
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*");
  }
}

// OPTIONAL: Support for CORS preflight OPTIONS request
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}
