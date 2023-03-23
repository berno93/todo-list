const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const authRouter = require('./router/auth.router')

const app = express()

app.use('/auth', authRouter)






app.listen(3000, () => {
    console.log('Serveur en écoute sur le port 3000');
  });