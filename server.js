
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;


app.use(express.json());

// Basic route 
app.get('/', (req, res) => {
  res.send('Hello Avinash! this is integration of swagger and node.js');
});

// Import Swagger
require('./swagger')(app);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
