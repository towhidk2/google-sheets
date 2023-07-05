const { google } = require('googleapis');
const fs = require('fs');
const readline = require('readline');

const credentials = require('./tradeguru.json');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const client = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  SCOPES
);


function updateGoogleSheet() {
    const sheets = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = '11DBBgxI4thkAVFlWF1mNQEET6sQpywwWc1OLeKKo-M0'; // Replace with the actual spreadsheet ID
  
    // Read the local CSV file
    const csvContent = fs.readFileSync('uae_2023-07-05.csv', 'utf8');
  
    // Parse the CSV content
    const rows = csvContent.split('\n').map((row) => row.split(','));
  
    // Specify the range where you want to update the data (e.g., Sheet1!A1:E5)
    const range = 'Test!A1:CX' + rows.length;
  
    // Prepare the update request
    const request = {
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: rows,
      },
    };
  
    // Send the update request to the API
    sheets.spreadsheets.values.update(request, function (err, response) {
      if (err) {
        console.error('The API returned an error:', err);
        return;
      }
      console.log('Google Sheet updated successfully!');
    });
}
  
  

client.authorize(function (err) {
    if (err) {
      console.error('Authentication error:', err);
      return;
    }
    console.log('Authentication successful!');
    updateGoogleSheet();
});
  