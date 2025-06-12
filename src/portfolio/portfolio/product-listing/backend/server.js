const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());

app.get('/products', (req, res) => {
  fs.readFile('products.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ message: 'Error reading products' });
    res.json(JSON.parse(data));
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
