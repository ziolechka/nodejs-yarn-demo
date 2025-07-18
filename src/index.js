const express = require('express');
const { add } = require('./utils/calculator');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  const result = add(2, 3);
  res.send(`Hello from Node.js! 2 + 3 = ${result}`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
