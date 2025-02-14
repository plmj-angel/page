const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve the "res" folder as static files
app.use(express.static(path.join(__dirname, 'res')));

// Serve the root directory
app.use(express.static(__dirname));

// Serve `app.html` on root request
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'app.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});