const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const app = express();
const port = 3010;

app.use(cors());

app.get('/api/beatles', (req, res) => {
  res.json({
    data: [
      { name: 'John' },
      { name: 'Paul' },
      { name: 'George' },
      { name: 'Ringo' },
    ],
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
