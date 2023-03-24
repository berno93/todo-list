const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {Schema, model} = mongoose

const userSchema = new Schema({
    
    email:{
        type: String,
        required: true,
        unique: true,
    },

    password:{
        type: String,
        required: true,
    }
})

// Fonction pour vérifier si le mot de passe fourni correspond au mot de passe enregistré dans la base de données
userSchema.methods.isValidPassword = async function(password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
  };
  
  // Fonction pour générer un token JWT pour l'authentification
  userSchema.methods.generateAuthToken = function() {
    const user = this;
    const token = jwt.sign({ userId: user._id }, 'mysecretkey');
    return token;
  };

const User = model('User',userSchema)
module.exports = User