import { Request, Response } from "express";
import PokemonService from "../../application/PokemonService";
import Pokemon from "../../domain/Pokemon";

export default class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  async savePokemonIntoDB(req: Request, res: Response) {
    const { pokemon } = req.params;
    try {
      const fetchedPokemon: Pokemon =
        await this.pokemonService.fetchPokemonFromAPI(pokemon);
      res.status(201).json(fetchedPokemon.toPrimitive());
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async releasePokemonById(req: Request, res: Response) {
    const { id } = req.params;
    const parsedId: number = parseInt(id, 10);
    try {
      await this.pokemonService.setFreeAPokemonById(parsedId);
      res.status(204).send({ message: "pokemon deleted successfully." });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async releasePokemonByName(req: Request, res: Response) {
    const { pokemon } = req.params;
    try {
      await this.pokemonService.setFreeAPokemonByName(pokemon);
      res.status(204).send({ message: "pokemon deleted successfully." });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async obtainPokedex(req: Request, res: Response) {
    try {
      const fetchedPokemon: Pokemon[] = await this.pokemonService.showPokedex();
      const pokedex: any[] = [];
      for (const pokemon of fetchedPokemon) {
        pokedex.push(pokemon.toPrimitive());
      }
      res.status(200).json(pokedex);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async releaseManyPokemonByType(req: Request, res: Response) {
    const { type } = req.params;
    try {
      await this.pokemonService.setFreeManyPokemonByType(type);
      res.status(204).send({ message: "pokemon deleted successfully." });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}
