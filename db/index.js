const mongoose = require('mongoose')
require('dotenv').config()

const { API_URI } = process.env

mongoose
    .connect(API_URI)
    .then((x) => {
        console.log(
            `Connected to Mongo! Database name: "${x.connections[0].name}"`
        )
    })
    .catch((err) => {
        console.error('Error connecting to mongo: ', err)
    })

module.exports = mongoose

