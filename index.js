const bodyParser = require('body-parser');
const express = require('express');
const api = require('./src/api');

const app = express();
const PORT = 5000;

app.use(bodyParser.json()) // for parsing application/json  
app.use('/api/v1', api)

app.listen(PORT, () => console.log('App Started on', +PORT));