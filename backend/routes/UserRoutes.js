import express from 'express';
import User from "../database/models/User.js";
import dotenv from "dotenv";

dotenv.config()

const URI = process.env.DB_HOST
const SALT = process.env.SALT

const userRouter = express.Router()

const userDB = new User(URI, SALT)
userDB.connect()

userRouter.post('/', (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.username) {
        return res.status(400).json({ message: 'Error. Please enter a username, an email and a password' })
    }
    userDB.createUser({ username: req.body.username, password: req.body.password, email: req.body.email })
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})

userRouter.post('/delete', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Error. Please enter an email and a password' })
    }
    userDB.deleteUser({ password: req.body.password, email: req.body.email })
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})

userRouter.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Error. Please enter a username and a password' })
    }
    userDB.login({ email: req.body.email, password: req.body.password })
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})

userRouter.get('/:userId', (req, res) => {
    userDB.getUserById(req.params.userId)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})

userRouter.patch('/capturedPokemons', (req, res) => {
    if (!req.body.id || !req.body.capturedPokemons) {
        return res.status(400).json({ message: 'Error. Please enter an id and an array of captured pokemons' })
    }
    userDB.setCapturedPokemons(req.body.id, req.body.capturedPokemons)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})

export default userRouter