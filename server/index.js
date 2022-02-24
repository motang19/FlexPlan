const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const routes = require('./api/routes');
const {db} = require('./models/users')
const app = express();

mongoose
 .connect(process.env.DATABASE)
 .then(() => console.log('DB Connected'));


app.use(bodyParser.json());
app.use(cors());

app.use('/api', routes)

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`)
});


    
