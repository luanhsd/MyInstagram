const express = require('express');
const path = require('path')
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose')

const app = express();

const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use((request, response, next) => {
    request.io = io
    next()
})

app.use(cors({ origin: "*" }));
app.use(express.json());

mongoose.connect(
    process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(`/files`, express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))

app.use(routes);

module.exports = server;