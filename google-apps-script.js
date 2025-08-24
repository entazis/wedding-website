/**
 * Google Apps Script for Wedding Guest Form Submissions
 *
 * This script should be deployed as a web app in Google Apps Script
 * and connected to a Google Sheet to store guest form submissions.
 *
 * Setup Instructions:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Replace the default code with this script
 * 4. Save and deploy as a web app
 * 5. Set permissions to "Anyone" and execute as "Me"
 * 6. Copy the web app URL to your .env file as VITE_GOOGLE_SHEETS_URL
 */

// Configuration - Update these values
const SHEET_NAME = "Guest Responses"; // Name of the sheet tab
const NOTIFICATION_EMAIL = "hello@barbiesbence.hu"; // Email for notifications

/**
 * Handles POST requests from the wedding website form
 */
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = getOrCreateSheet();

    // Parse form data
    const formData = parseFormData(e);

    // Validate required fields
    if (!formData.name || !formData.attendance) {
      return createResponse("error", "Name and attendance are required fields");
    }

    // Add timestamp
    formData.timestamp = new Date();

    // Write to sheet
    const rowNumber = writeToSheet(sheet, formData);

    // Send notification email (optional)
    sendNotificationEmail(formData);

    // Return success response
    return createResponse("success", "Form submitted successfully", rowNumber);
  } catch (error) {
    console.error("Error processing form submission:", error);
    return createResponse("error", "Internal server error: " + error.message);
  }
}

/**
 * Handles GET requests (for testing)
 */
function doGet(e) {
  return createResponse("success", "Wedding Guest Form API is running");
}

/**
 * Gets or creates the sheet for storing responses
 */
function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    // Create new sheet with headers
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    const headers = [
      "Timestamp",
      "Name",
      "Email",
      "Phone",
      "Attendance",
      "Guest Count",
      "Food Allergies",
      "Dietary Restrictions",
      "Special Requests",
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#f0f0f0");

    // Set column widths
    sheet.setColumnWidth(1, 150); // Timestamp
    sheet.setColumnWidth(2, 200); // Name
    sheet.setColumnWidth(3, 200); // Email
    sheet.setColumnWidth(4, 150); // Phone
    sheet.setColumnWidth(5, 100); // Attendance
    sheet.setColumnWidth(6, 100); // Guest Count
    sheet.setColumnWidth(7, 300); // Food Allergies
    sheet.setColumnWidth(8, 300); // Dietary Restrictions
    sheet.setColumnWidth(9, 400); // Special Requests
  }

  return sheet;
}

/**
 * Parses form data from the POST request
 */
function parseFormData(e) {
  const params = e.parameter;

  return {
    name: params.name || "",
    email: params.email || "",
    phone: params.phone || "",
    attendance: params.attendance || "",
    guestCount: parseInt(params.guestCount) || 1,
    foodAllergies: params.foodAllergies || "",
    dietaryRestrictions: params.dietaryRestrictions || "",
    specialRequests: params.specialRequests || "",
  };
}

/**
 * Writes form data to the sheet
 */
function writeToSheet(sheet, formData) {
  const row = [
    formData.timestamp,
    formData.name,
    formData.email,
    formData.phone,
    formData.attendance,
    formData.guestCount,
    formData.foodAllergies,
    formData.dietaryRestrictions,
    formData.specialRequests,
  ];

  const nextRow = sheet.getLastRow() + 1;
  sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);

  // Format the new row
  const newRowRange = sheet.getRange(nextRow, 1, 1, row.length);
  newRowRange.setBorder(true, true, true, true, false, false);

  // Color code based on attendance
  if (formData.attendance === "yes") {
    newRowRange.setBackground("#d4edda"); // Light green
  } else if (formData.attendance === "no") {
    newRowRange.setBackground("#f8d7da"); // Light red
  } else if (formData.attendance === "maybe") {
    newRowRange.setBackground("#fff3cd"); // Light yellow
  }

  return nextRow;
}

/**
 * Sends notification email when a new response is received
 */
function sendNotificationEmail(formData) {
  if (!NOTIFICATION_EMAIL) return;

  try {
    const subject = `New Wedding RSVP: ${formData.name}`;
    const attendanceText = {
      yes: "Igen, ott lesz! 🎉",
      no: "Sajnos nem tud menni 😢",
      maybe: "Még nem biztos 🤔",
    };

    const body = `
Új visszajelzés érkezett az esküvői weboldalról:

👤 Név: ${formData.name}
📧 Email: ${formData.email || "Nincs megadva"}
📱 Telefon: ${formData.phone || "Nincs megadva"}
✅ Részvétel: ${attendanceText[formData.attendance] || formData.attendance}
👥 Vendégek száma: ${formData.guestCount}

🥜 Étel allergiák: ${formData.foodAllergies || "Nincs"}
🥗 Étkezési megszorítások: ${formData.dietaryRestrictions || "Nincs"}
💬 Különleges kérések: ${formData.specialRequests || "Nincs"}

⏰ Beküldve: ${formData.timestamp.toLocaleString("hu-HU")}

---
Ez egy automatikus értesítés az esküvői visszajelzési rendszerből.
    `.trim();

    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: subject,
      body: body,
    });
  } catch (error) {
    console.error("Error sending notification email:", error);
    // Don't throw error - form submission should still succeed
  }
}

/**
 * Creates a standardized JSON response
 */
function createResponse(result, message, data = null) {
  const response = {
    result: result,
    message: message,
    timestamp: new Date().toISOString(),
  };

  if (data !== null) {
    response.data = data;
    response.row = data; // For backward compatibility
  }

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}

/**
 * Handles preflight OPTIONS requests for CORS
 */
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}
