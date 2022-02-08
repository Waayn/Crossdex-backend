import express from 'express';
import Pokemon from "../database/models/Pokemon.js";
import dotenv from "dotenv";

dotenv.config()

const URI = process.env.DB_HOST
const pokemonRouter = express.Router()

const pokemonDB = new Pokemon(URI)
pokemonDB.connect()

pokemonRouter.get('/', (req, res) => {
    pokemonDB.getAllPokemons()
        .then(pokemons => res.status(200).json(pokemons))
        .catch(error => res.status(500).json(error))
})

pokemonRouter.get('/:pokemonId', (req, res) => {
    pokemonDB.getPokemonById(req.params.pokemonId)
        .then(pokemon => res.status(200).json(pokemon))
        .catch(error => res.status(500).json(error))
})

pokemonRouter.post('/selectedPokemons', (req, res) => {
    if (!req.body.ids) {
        return res.status(400).json({ message: 'Error. Please enter ids' })
    }
    pokemonDB.getPokemonsById(req.body.ids)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json(error))
})

export default pokemonRouter