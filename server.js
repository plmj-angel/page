const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// idk wtf to name this folder...
app.use(express.static(path.join(__dirname, 'res')));

//index file really tbh
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'app.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});