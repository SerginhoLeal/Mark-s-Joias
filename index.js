require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

requireDir('./src/models');

//Rotas
app.use('/api', require('./src/routes'));

app.listen(process.env.PORT || 3000);

//https://localhost/api/project