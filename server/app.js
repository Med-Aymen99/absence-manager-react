const express = require('express');
const { members, absences } = require('./api/api.js');
const cors = require('cors');

const app = express();
app.use(cors()); 

app.get('/members', async (req, res) => {
  try {
    const membersData = await members();
    res.json(membersData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/absences', async (req, res) => {
  try {
    const absencesData = await absences();
    res.json(absencesData);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});