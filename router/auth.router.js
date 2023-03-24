const router = require('express').Router()
const User = require('../models/user.model')

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé' })
        }
        const newUser = new User({
            email,
            password,
        })

        const savedUser = await newUser.save()

        res.status(201).json({ user: savedUser })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Une erreur est survenue lors de la création de l'utilisateur",
        })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user || !user.isValidPassword(password)) {
            res.status(401).json({ error: 'Identifiants invalides' })
        } else {
            const token = user.generateAuthToken()
            res.json({ token })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router
