// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import SQLiteRepository from "./context/pokemon/infrastructure/persistence/SQLite/DBRepository";
import PokemonService from "./context/pokemon/application/PokemonService";
import PokemonController from "./context/pokemon/infrastructure/express/PokemonController";
import routeCache from "route-cache";

dotenv.config();

const app: Express = express();
app.use(express.json());

const port = process.env.PORT || 3001;

let pokemonController: PokemonController;

if (process.env.NODE_ENV === "development") {
  const SQLitePokemonRepository = new SQLiteRepository();
  const pokemonService = new PokemonService(SQLitePokemonRepository);
  pokemonController = new PokemonController(pokemonService);
  app.post(
    "/api/v1/catch/pokemon-name/:pokemon",
    pokemonController.savePokemonIntoDB.bind(pokemonController)
  );
  app.delete(
    "/api/v1/set-free/pokemon-id/:id",
    pokemonController.releasePokemonById.bind(pokemonController)
  );
  app.delete(
    "/api/v1/set-free/pokemon-name/:pokemon",
    pokemonController.releasePokemonByName.bind(pokemonController)
  );
  app.delete(
    "/api/v1/set-free/pokemon-type/:type",
    pokemonController.releaseManyPokemonByType.bind(pokemonController)
  );
  app.get(
    "/api/v1/pokedex",
    routeCache.cacheSeconds(60),
    pokemonController.obtainPokedex.bind(pokemonController)
  );
}

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
