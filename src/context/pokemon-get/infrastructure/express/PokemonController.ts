import { Request, Response } from "express";
import PokemonService from "../../application/PokemonService";
import Pokemon from "../../domain/Pokemon";


export default class PokemonController {
    constructor(private pokemonService: PokemonService) {}

    async savePokemonIntoDB(req: Request, res: Response) {
        const { pokemon } = req.params;
        const fetchedPokemon: Pokemon = await this.pokemonService.fetchPokemonFromAPI(pokemon);
        res.status(201).json(fetchedPokemon.toPrimitive());
    }
}