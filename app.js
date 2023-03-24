const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const authRouter = require('./router/auth.router')
const PORT = 3000

require('dotenv').config()
require('./db')

const app = express()

app.use('/', authRouter)


app.use((err, req, res, next) => {
  res.status(500).json({ status: 'error', message: err })
})
app.use((req, res) => {
  res.status(404).json({ message: 'not found : check the url !' })
})

app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`)
  })


