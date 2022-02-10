import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pokemonRoutes from './routes/PokemonRoutes.js';
import userRoutes from './routes/UserRoutes.js';

dotenv.config()
const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/user', userRoutes)
app.use('/pokemons', pokemonRoutes)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

export { app }