const express = require('express');
const cors = require('cors');

const { formAutomation, dataScraping } = require('./puppeteer.js');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

// sample api routes for testing
app.get('/', (req, res) => {
  res.json("welcome to our server")
});
  
app.post('/api/automation', async (req, res) => {
  const { firstName, lastName, userName, email, password, gender, country } = req.body;
  try{
    await formAutomation(firstName, lastName, userName, email, password, gender, country);
  } catch (error) {
    console.log(error);
  }
  res.json({ message: "success!" });
});

app.post('/api/scraping', async (req, res) => {
  const { url } = req.body;
  console.log(url);
  try{
    data = await dataScraping(url);

    res.json({ data });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, (error) =>{
  if(!error)
    console.log("Server is Successfully Running, and App is listening on port "+ PORT)
  else 
    console.log("Error occurred, server can't start", error);
  }
);