import { Request, Response } from "express";
import PokemonService from "../../application/PokemonService";
import Pokemon from "../../domain/Pokemon";

export default class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  async savePokemonIntoDB(req: Request, res: Response) {
    const { pokemon } = req.params;
    const fetchedPokemon: Pokemon =
      await this.pokemonService.fetchPokemonFromAPI(pokemon);
    res.status(201).json(fetchedPokemon.toPrimitive());
  }

  async releasePokemonById(req: Request, res: Response) {
    const { id } = req.params;
    const parsedId: number = parseInt(id, 10);
    try {
        await this.pokemonService.setFreeAPokemonById(parsedId);
        res.status(204).send({message: "pokemon deleted successfully."});
    } catch (error: any) {
        res.status(404).json({message: error.message})
    }
  }
}
