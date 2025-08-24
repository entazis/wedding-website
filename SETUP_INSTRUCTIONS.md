# Wedding Guest Form - Google Sheets Integration Setup

This guide will help you set up the Google Sheets integration for your wedding guest form.

## Overview

The guest form collects the following information:

- Guest name (required)
- Email address (optional)
- Phone number (optional)
- Attendance status (required): Yes, No, or Maybe
- Number of guests (required if attending)
- Food allergies (optional)
- Dietary restrictions (optional)
- Special requests (optional)

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Give it a meaningful name like "Wedding Guest Responses - Barbi & Bence"
4. The script will automatically create the necessary headers and formatting

## Step 2: Set up Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete the default `myFunction()` code
3. Copy and paste the entire contents of `google-apps-script.js` into the editor
4. Update the configuration variables at the top:

    ```javascript
       const SHEET_NAME = 'Guest Responses'; // Name of the sheet tab
       const NOTIFICATION_EMAIL = 'hello@barbiesbence.hu'; // Your email for notifications
    ```

5. Save the project (Ctrl+S or Cmd+S)
6. Give your project a name like "Wedding Guest Form Handler"

## Step 3: Deploy as Web App

1. Click the **Deploy** button (top right)
2. Choose **New deployment**
3. Click the gear icon next to "Type" and select **Web app**
4. Fill in the deployment settings:
   - **Description**: "Wedding Guest Form API"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. **Important**: Copy the Web app URL - you'll need this for the next step
7. Click **Done**

## Step 4: Configure Your Website

1. In your wedding website project, create a `.env` file in the root directory
2. Add the Google Sheets URL:

    ```txt
       VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
    ```

3. Replace `YOUR_SCRIPT_ID` with the actual URL you copied from step 3.

## Step 5: Test the Integration

1. Start your development server:

    ```bash
       npm run dev
    ```

2. Navigate to your website and scroll to the RSVP section
3. Fill out the form and submit it
4. Check your Google Sheet - you should see the new response appear
5. Check your email for the notification (if configured)

## Customization Options

### Email Notifications

- The script sends email notifications for each new submission
- To disable notifications, set `NOTIFICATION_EMAIL = ''` in the script
- To customize the email format, modify the `sendNotificationEmail` function

### Sheet Formatting

- Responses are color-coded:
  - Green: "Yes" responses
  - Red: "No" responses  
  - Yellow: "Maybe" responses
- You can modify colors in the `writeToSheet` function

### Additional Fields

If you want to add more fields to the form:

1. Update the form schema in `GuestForm.tsx`
2. Add the new field to the form UI
3. Update the `parseFormData` function in the Google Apps Script
4. Add the new column header in the `getOrCreateSheet` function

## Troubleshooting

### Common Issues

#### "Google Sheets URL nincs konfigurálva" error

- Make sure your `.env` file is in the root directory
- Ensure the variable name is exactly `VITE_GOOGLE_SHEETS_URL`
- Restart your development server after adding the .env file

#### Form submissions not appearing in the sheet

- Check the Google Apps Script logs: Go to Apps Script > Executions
- Verify the web app is deployed with "Anyone" access
- Make sure you're using the correct web app URL

#### CORS errors

- The script includes CORS headers, but if you still have issues, try redeploying the web app
- Make sure the `doOptions` function is included in your script

#### Email notifications not working

- Verify the email address in `NOTIFICATION_EMAIL` is correct
- Check your Gmail spam folder
- Gmail has daily sending limits for Apps Script

### Getting Help

If you encounter issues:

1. Check the browser's developer console for error messages
2. Look at the Google Apps Script execution logs
3. Verify all configuration steps were followed correctly

## Security Notes

- The web app is set to "Anyone" access, which is necessary for the website to submit data
- No sensitive information should be stored in the form
- The Google Sheet is private to your Google account unless you explicitly share it
- Consider setting up a dedicated Google account for this if you prefer

## Data Export

Your guest responses are stored in Google Sheets, which makes it easy to:

- Export to Excel or CSV format
- Create charts and summaries
- Share with wedding planners or vendors
- Print guest lists and dietary requirement summaries

The data is automatically timestamped and formatted for easy reading.
