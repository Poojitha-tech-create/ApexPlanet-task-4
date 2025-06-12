const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  const newEntry = { name, email, message, date: new Date().toISOString() };

  fs.readFile('contact_data.json', 'utf8', (err, data) => {
    let entries = [];
    if (!err && data) {
      entries = JSON.parse(data);
    }
    entries.push(newEntry);
    fs.writeFile('contact_data.json', JSON.stringify(entries, null, 2), err => {
      if (err) return res.status(500).json({ message: 'Error saving message' });
      res.json({ message: 'Message sent successfully!' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
