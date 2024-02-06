const fetch = require('node-fetch');
const cors = require('cors');
const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', async (req, res) => {
  const { ending } = req.query;

  try {
    if (!ending) {
      throw new Error('Ending parameter is missing');
    }

    const response = await fetch(`${process.env.API_URI}/${ending}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Error occurred' });
  }
});