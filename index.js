const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
const connection = require('./connection');
var mongoose = require('mongoose');
const cors = require('cors');

var router = express.Router();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use(require('./routes'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))