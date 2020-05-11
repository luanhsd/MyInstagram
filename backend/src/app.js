const express = require('express');
const path = require('path')
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose')

const app = express();


app.use(cors({ origin: "*" }));
app.use(express.json());

mongoose.connect(
    process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(`/files`, express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

app.use(routes);

module.exports = app;