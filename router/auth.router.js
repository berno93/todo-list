const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

router.get('/verify', async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    res.status(200).json({ message: 'token valid', decodedToken });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    if (!('email' in req.body && 'password' in req.body)) {
      return res.status(422).json({ message: 'need 2 keys : email, password' });
    }
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(409).json({ message: 'Ce mail est déjà utilisé' });
    }
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    const ans = await User.create({ email, password: hash });
    res.status(201).json({
      message: "L'utilisateur a bien été enregistré",
      user: {
        id: ans._id,
        email,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    if (!('email' in req.body && 'password' in req.body)) {
      return res.status(422).json({ message: 'need 2 keys : email, password' });
    }
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(409).json({ message: 'wrong email or password' });
    }
    const isValid = await bcrypt.compare(password, foundUser.password);
    if (!isValid) {
      return res.status(409).json({ message: 'wrong email or password' });
    }
    const dataToSend = {
      userId: foundUser._id.toString(),
      token: jwt.sign(
        { userId: foundUser._id.toString(), email: foundUser.email },
        process.env.TOKEN_SECRET,
        {
          expiresIn: '10h',
        }
      ),
    };
    res.status(200).json(dataToSend);
  } catch (err) {
    next(err);
  }
});

router.delete('/:userId', async (req, res, next) => {
  try {
    await authController.deleteUser(req, res, next);
  } catch (err) {
    next(err);
  }
});

module.exports = router;