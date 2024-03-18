// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import SQLiteRepository from "./context/pokemon-get/infrastructure/persistence/SQLite/DBRepository";
import PokemonService from "./context/pokemon-get/application/PokemonService";
import PokemonController from "./context/pokemon-get/infrastructure/express/PokemonController";

dotenv.config();

const app: Express = express();
app.use(express.json());


const port = process.env.PORT || 3001;

let pokemonController: PokemonController;

if (process.env.NODE_ENV === "development") {
  const SQLitePokemonRepository = new SQLiteRepository();
  const pokemonService = new PokemonService(SQLitePokemonRepository);
  pokemonController = new PokemonController(pokemonService);
  app.post('/api/register/pokemon/:pokemon', pokemonController.savePokemonIntoDB.bind(pokemonController));
}

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});