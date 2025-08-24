# CORS Error Troubleshooting Guide

## The Problem

You're getting this error:

```txt
Access to fetch at 'https://script.google.com/macros/s/...' from origin 'http://localhost:8080' has been blocked by CORS policy
```

This means your Google Apps Script isn't properly configured to accept requests from your website.

## Solution Steps

### Step 1: Verify Your Google Apps Script Setup

1. **Go to your Google Apps Script project**
   - Open [Google Apps Script](https://script.google.com)
   - Find your wedding form project

2. **Check the code is correct**
   - Make sure you have the complete `google-apps-script.js` code
   - Verify the `doOptions` function is present (handles CORS preflight requests)
   - Ensure `createResponse` function includes CORS headers

### Step 2: Redeploy Your Web App

This is the most important step - you need to create a NEW deployment:

1. **In Google Apps Script, click "Deploy" > "New deployment"**
2. **Click the gear icon next to "Type" and select "Web app"**
3. **Set these exact settings:**
   - Description: "Wedding Guest Form API v2" (or any new description)
   - Execute as: **Me (your email)**
   - Who has access: **Anyone**
4. **Click "Deploy"**
5. **Copy the NEW web app URL** (it will be different from your old one)
6. **Update your .env file** with the new URL

### Step 3: Update Your .env File

Replace your current URL with the new one:
```
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/NEW_SCRIPT_ID/exec
```

### Step 4: Restart Your Development Server

```bash
# Stop your current server (Ctrl+C)
npm run dev
```

### Step 5: Test the Form

Try submitting the form again. If it still doesn't work, continue to the next steps.

## Advanced Troubleshooting

### Check Google Apps Script Logs

1. Go to your Google Apps Script project
2. Click "Executions" in the left sidebar
3. Submit your form and check if any executions appear
4. If you see errors, they'll help identify the issue

### Test the Script Directly

1. In Google Apps Script, click "Run" on the `doGet` function
2. Check the logs for any errors
3. If `doGet` works, the issue is likely with deployment settings

### Verify CORS Headers

Your script should include these functions:

```javascript
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function createResponse(result, message, data = null) {
  const response = {
    result: result,
    message: message,
    timestamp: new Date().toISOString(),
  };

  if (data !== null) {
    response.data = data;
    response.row = data;
  }

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}
```

## Common Mistakes

1. **Using an old deployment URL** - Always create a NEW deployment when you change the script
2. **Wrong permissions** - Must be "Anyone" not "Anyone with Google account"
3. **Missing doOptions function** - Required for CORS preflight requests
4. **Not restarting dev server** - Environment variables only load on startup

## Still Not Working?

If you're still having issues:

1. **Try incognito mode** - Sometimes browser cache causes issues
2. **Check browser network tab** - Look for the actual HTTP status codes
3. **Test with a simple GET request** - Visit your script URL directly in browser
4. **Create a completely new Google Apps Script project** - Sometimes there are permission issues

## Quick Test

To verify your script is working, visit this URL directly in your browser:
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

You should see:
```json
{
  "result": "success",
  "message": "Wedding Guest Form API is running",
  "timestamp": "2024-..."
}
```

If you don't see this, your script isn't deployed correctly.
