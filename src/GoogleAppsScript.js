/**
 * GOOGLE APPS SCRIPT FOR WINDOW TO BHARAT SYNC & EMAILS
 * 
 * INSTRUCTIONS FOR SETTING UP GOOGLE SHEETS:
 * 
 * 1. Open Google Sheets (https://sheets.google.com).
 * 2. Create a new empty spreadsheet or open an existing one.
 * 3. Give your spreadsheet a name (e.g., "EQ Audit Submissions").
 * 4. In the top menu, go to Extensions -> Apps Script.
 * 5. Delete any code in the editor (Code.gs) and paste this entire script.
 * 6. Click the Save icon (floppy disk) at the top of the editor.
 * 7. Click the "Deploy" button (top right) -> "New deployment".
 * 8. Click the Select type (gear icon) next to "Deploy" and choose "Web app".
 * 9. Fill in the fields:
 *    - Description: "Window to Bharat API & Emails"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone" (CRITICAL: Choose "Anyone" to allow submissions from the website).
 * 10. Click "Deploy".
 * 11. Authorize access if prompted (Google will show a warning saying the app isn't verified; click "Advanced" -> "Go to Untitled Project (unsafe)" -> "Allow").
 * 12. Copy the "Web app URL" (it ends with /exec).
 * 13. Paste this URL in your react project code inside `src/pages/Assessment.tsx` (replace the placeholder URL or we will provide a configuration setting where you can insert it).
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var type = data.type || "eq_audit"; // fallback for backward compatibility
    
    if (type === "eq_audit") {
      // 1. Sync to Google Sheets
      try {
        var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
        if (activeSpreadsheet) {
          var sheet = activeSpreadsheet.getActiveSheet();
          var headers = [
            "Timestamp", "Name", "Email", "Phone", "Overall Score", "Result Profile", 
            "Emotional Awareness Score", "Emotional Regulation Score", "Pattern Recognition Score", 
            "Relational Intelligence Score", "Inner Alignment Score", "Resilience & Surrender Score"
          ];
          
          if (sheet.getLastRow() === 0) {
            sheet.appendRow(headers);
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
        } else {
          Logger.log("No active spreadsheet bound to script. Running as standalone script.");
        }
      } catch (sheetError) {
        Logger.log("Failed to sync to Google Sheet: " + sheetError.toString());
      }
      
      // 2. Send Results Email to User (BCC admin)
      sendResultsEmail(data);
      
      return ContentService.createTextOutput(JSON.stringify({ 
        status: "success", 
        message: "EQ Audit results saved and email sent successfully." 
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
      
    } else if (type === "contact") {
      // Send Contact Form Email
      sendContactEmail(data);
      
      return ContentService.createTextOutput(JSON.stringify({ 
        status: "success", 
        message: "Contact form inquiry sent successfully." 
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
      
    } else if (type === "registration") {
      // Send Registration Form Email
      sendRegistrationEmail(data);
      
      return ContentService.createTextOutput(JSON.stringify({ 
        status: "success", 
        message: "Registration details sent successfully." 
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader("Access-Control-Allow-Origin", "*");
    }
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "error", 
      message: error.toString() 
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*");
  }
}

// Support for CORS preflight OPTIONS request
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendResultsEmail(data) {
  var userEmail = data.email;
  var bccEmail = "web.windowtobharat@gmail.com";
  var subject = "Your EQ Audit Results - Window to Bharat";
  
  // Format dimension scores table rows
  var dimsHtml = "";
  var dims = [
    "Emotional Awareness",
    "Emotional Regulation",
    "Pattern Recognition",
    "Relational Intelligence",
    "Inner Alignment",
    "Resilience & Surrender"
  ];
  
  for (var i = 0; i < dims.length; i++) {
    var dName = dims[i];
    var dScore = data.dimensionScores[dName] || 0;
    var percentage = (dScore / 10) * 100;
    dimsHtml += `
      <tr style="border-bottom: 1px solid #e5e5e5;">
        <td style="padding: 12px 15px; font-weight: bold; color: #204e4a;">${dName}</td>
        <td style="padding: 12px 15px; text-align: right; color: #204e4a; font-weight: bold;">${dScore} / 10</td>
      </tr>
      <tr>
        <td colspan="2" style="padding: 0 15px 12px 15px;">
          <div style="background-color: #f0ebe4; height: 6px; border-radius: 3px; overflow: hidden; width: 100%;">
            <div style="background: linear-gradient(90deg, #b77950 0%, #204e4a 100%); width: ${percentage}%; height: 100%; border-radius: 3px;"></div>
          </div>
        </td>
      </tr>
    `;
  }
  
  var htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your EQ Audit Report</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #faf7f3; font-family: 'Georgia', 'Times New Roman', serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #faf7f3; padding: 40px 10px;">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); overflow: hidden; border: 1px solid #eae2d5;">
              <!-- Header -->
              <tr>
                <td style="background-color: #204e4a; padding: 40px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 2px; font-weight: normal; font-family: 'Georgia', serif;">WINDOW TO BHARAT</h1>
                  <p style="color: #d5b89c; margin: 10px 0 0 0; font-size: 12px; letter-spacing: 4px; text-transform: uppercase;">Your Gateway to Explore, Heal, and Mindfulness</p>
                </td>
              </tr>
              <!-- Body -->
              <tr>
                <td style="padding: 40px 30px;">
                  <p style="font-size: 16px; color: #555555; margin: 0 0 30px 0; line-height: 1.6;">Namaste <strong>${data.name}</strong>,</p>
                  <p style="font-size: 16px; color: #555555; margin: 0 0 30px 0; line-height: 1.6;">Thank you for completing the <strong>Emotional Intelligence (EQ) Audit</strong> on Window to Bharat. We have analyzed your responses and compiled your custom emotional awareness profile.</p>
                  
                  <!-- Score Card -->
                  <div style="background-color: #fdfaf6; border: 1px solid #eae2d5; border-radius: 16px; padding: 30px; margin-bottom: 40px; text-align: center;">
                    <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #b77950; font-weight: bold;">Overall EQ Score</span>
                    <h2 style="font-size: 64px; margin: 10px 0; color: #204e4a; font-family: 'Georgia', serif; font-weight: normal;">${data.score} <span style="font-size: 20px; color: #888888;">/ 10</span></h2>
                    <div style="background-color: #204e4a; color: #ffffff; display: inline-block; padding: 6px 16px; border-radius: 20px; font-size: 13px; letter-spacing: 1px; font-family: 'Arial', sans-serif;">
                      Profile: <strong>${data.resultTitle}</strong>
                    </div>
                    <p style="font-size: 15px; color: #666666; font-style: italic; margin: 20px 0 0 0; line-height: 1.6; border-left: 3px solid #b77950; padding-left: 15px; text-align: left;">
                      "${data.wordForYou}"
                    </p>
                  </div>
                  
                  <!-- Insights Section -->
                  <h3 style="font-size: 20px; color: #204e4a; border-bottom: 2px solid #b77950; padding-bottom: 10px; margin: 0 0 20px 0; font-weight: normal;">Profile Insights</h3>
                  
                  <h4 style="font-size: 16px; color: #204e4a; margin: 0 0 10px 0;">What this score reveals</h4>
                  <p style="font-size: 14px; color: #555555; line-height: 1.7; margin: 0 0 25px 0;">${data.reveals}</p>
                  
                  <h4 style="font-size: 16px; color: #204e4a; margin: 0 0 10px 0;">Your path forward</h4>
                  <p style="font-size: 14px; color: #555555; line-height: 1.7; margin: 0 0 25px 0;">${data.pathForward}</p>
                  
                  <h4 style="font-size: 16px; color: #204e4a; margin: 0 0 10px 0;">Why this matters now</h4>
                  <p style="font-size: 14px; color: #555555; line-height: 1.7; margin: 0 0 35px 0;">${data.whyMatters}</p>
                  
                  <!-- Dimension Breakdown -->
                  <h3 style="font-size: 20px; color: #204e4a; border-bottom: 2px solid #b77950; padding-bottom: 10px; margin: 0 0 20px 0; font-weight: normal;">The 6 Dimensions of EQ</h3>
                  <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 40px; font-family: 'Arial', sans-serif; font-size: 14px;">
                    ${dimsHtml}
                  </table>
                  
                  <!-- Call to Action -->
                  <div style="text-align: center; margin-top: 40px; border-top: 1px solid #eae2d5; padding-top: 30px;">
                    <div style="background-color: #fdfaf6; border: 1.5px dashed #b77950; border-radius: 12px; padding: 24px; margin: 0 0 25px 0; text-align: center;">
                      <p style="font-size: 16px; color: #204e4a; margin: 0; line-height: 1.6; font-weight: bold; font-family: 'Georgia', serif;">
                        Want to deepen these emotional intelligence skills? Join EQ Practitioner <span style="background-color: #f7e6d2; color: #204e4a; padding: 2px 8px; border-radius: 4px; font-weight: bold; border: 1px solid #d5b89c;">Jestin Anthony</span> in Dharamshala for our 5-day immersive Zen wellness retreat.
                      </p>
                    </div>
                    <a href="https://window-to-bharat.vercel.app/Mindfulness" target="_blank" style="background-color: #204e4a; color: #ffffff; display: inline-block; padding: 16px 30px; text-decoration: none; border-radius: 30px; font-size: 14px; font-weight: bold; letter-spacing: 1px; font-family: 'Arial', sans-serif; box-shadow: 0 4px 10px rgba(32,78,74,0.15);">Explore Retreat Program</a>
                  </div>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="background-color: #faf7f3; border-top: 1px solid #eae2d5; padding: 30px 40px; text-align: center; color: #888888; font-size: 12px; font-family: 'Arial', sans-serif; line-height: 1.5;">
                  <p style="margin: 0 0 10px 0;">Soulful • Delhi, India</p>
                  <p style="margin: 0;">If you have any questions, write to us at <a href="mailto:web.windowtobharat@gmail.com" style="color: #204e4a; text-decoration: none;">web.windowtobharat@gmail.com</a></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
  
  MailApp.sendEmail(userEmail, subject, "", {
    htmlBody: htmlBody,
    bcc: bccEmail,
    name: "Window to Bharat"
  });
}

function sendContactEmail(data) {
  var adminEmail = "web.windowtobharat@gmail.com";
  var subject = "New Contact Form Inquiry - Window to Bharat";
  
  var htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Inquiry</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f7f7f7; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border: 1px solid #dddddd; padding: 30px;">
        <h2 style="color: #204e4a; border-bottom: 2px solid #b77950; padding-bottom: 10px; margin-top: 0;">New Contact Form Message</h2>
        <table border="0" cellpadding="10" cellspacing="0" width="100%" style="margin-top: 20px;">
          <tr>
            <td width="30%" style="font-weight: bold; background-color: #fafafa; border-bottom: 1px solid #eeeeee;">Name:</td>
            <td style="border-bottom: 1px solid #eeeeee;">${data.name}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background-color: #fafafa; border-bottom: 1px solid #eeeeee;">Email:</td>
            <td style="border-bottom: 1px solid #eeeeee;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr>
            <td style="font-weight: bold; background-color: #fafafa; border-bottom: 1px solid #eeeeee;">Submitted At:</td>
            <td style="border-bottom: 1px solid #eeeeee;">${new Date().toLocaleString()}</td>
          </tr>
          <tr>
            <td colspan="2" style="font-weight: bold; background-color: #fafafa; border-bottom: 1px solid #eeeeee; padding-top: 20px;">Message:</td>
          </tr>
          <tr>
            <td colspan="2" style="padding: 15px; border: 1px solid #eeeeee; background-color: #fbfbfb; border-radius: 5px; white-space: pre-wrap;">${data.message}</td>
          </tr>
        </table>
      </div>
    </body>
    </html>
  `;
  
  MailApp.sendEmail(adminEmail, subject, "", {
    htmlBody: htmlBody,
    replyTo: data.email,
    name: "Window to Bharat Contact Form"
  });
}

function sendRegistrationEmail(data) {
  var adminEmail = "web.windowtobharat@gmail.com";
  var subject = "New Retreat Registration - Window to Bharat";
  
  var htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Retreat Registration</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f7f7f7; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border: 1px solid #dddddd; padding: 30px;">
        <h2 style="color: #204e4a; border-bottom: 2px solid #b77950; padding-bottom: 10px; margin-top: 0;">New Retreat Registration</h2>
        <table border="0" cellpadding="10" cellspacing="0" width="100%" style="margin-top: 20px;">
          <tr>
            <td width="30%" style="font-weight: bold; background-color: #fafafa; border-bottom: 1px solid #eeeeee;">Name:</td>
            <td style="border-bottom: 1px solid #eeeeee;">${data.name}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background-color: #fafafa; border-bottom: 1px solid #eeeeee;">Email:</td>
            <td style="border-bottom: 1px solid #eeeeee;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr>
            <td style="font-weight: bold; background-color: #fafafa; border-bottom: 1px solid #eeeeee;">Phone:</td>
            <td style="border-bottom: 1px solid #eeeeee;">${data.phone}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background-color: #fafafa; border-bottom: 1px solid #eeeeee;">Country:</td>
            <td style="border-bottom: 1px solid #eeeeee;">${data.country}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; background-color: #fafafa; border-bottom: 1px solid #eeeeee;">Submitted At:</td>
            <td style="border-bottom: 1px solid #eeeeee;">${new Date().toLocaleString()}</td>
          </tr>
          <tr>
            <td colspan="2" style="font-weight: bold; background-color: #fafafa; border-bottom: 1px solid #eeeeee; padding-top: 20px;">Message/Requirements:</td>
          </tr>
          <tr>
            <td colspan="2" style="padding: 15px; border: 1px solid #eeeeee; background-color: #fbfbfb; border-radius: 5px; white-space: pre-wrap;">${data.message || 'None'}</td>
          </tr>
        </table>
      </div>
    </body>
    </html>
  `;
  
  MailApp.sendEmail(adminEmail, subject, "", {
    htmlBody: htmlBody,
    replyTo: data.email,
    name: "Window to Bharat Registration"
  });
}

// Run this function once in the Apps Script Editor to authorize email sending permissions!
function testEmail() {
  var testEmailAddress = "web.windowtobharat@gmail.com"; 
  try {
    MailApp.sendEmail(testEmailAddress, "Test Email from Window to Bharat Script", "If you are reading this, your Apps Script email permissions are successfully authorized!");
    Logger.log("Test email sent successfully! Permissions are fully authorized.");
  } catch (error) {
    Logger.log("Failed to send test email: " + error.toString());
  }
}
