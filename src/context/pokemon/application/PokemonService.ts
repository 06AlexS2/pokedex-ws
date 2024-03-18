import Pokemon from "../domain/Pokemon";
import Id from "../domain/value_objects/general/Id";
import Name from "../domain/value_objects/general/Name";
import PokemonRepository from "../infrastructure/PokemonRepository";
import PokemonType from "../domain/PokemonType";
import PokemonMove from "../domain/PokemonMove";
import EffectChance from "../domain/value_objects/EffectChance";
import MoveAccuracy from "../domain/value_objects/MoveAccuracy";
import MovePP from "../domain/value_objects/MovePP";
import MovePower from "../domain/value_objects/MovePower";
import MovePriority from "../domain/value_objects/MovePriority";
import ShortEffect from "../domain/value_objects/ShortEffect";
import MoveEffect from "../domain/PokemonMoveEffect";
import MoveDamageClass from "../domain/MoveDamageClass";

export default class PokemonService {
  //methods that will use the repository to get the data
  constructor(private pokemonRepository: PokemonRepository) {}

  async fetchPokemonFromAPI(pokeName: string): Promise<Pokemon> {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokeName}`
    );
    //validate if the request dont throw an error
    if (response.status !== 200) {
      return Promise.reject("Not a valid pokemon");
    }
    const pokemonData = await response.json();
    if (!pokemonData) {
      return Promise.reject("Pokemon not found");
    }
    const id = new Id(pokemonData.id);
    const name = new Name(pokemonData.name);
    const types: PokemonType[] = pokemonData.types.map((type: any) => {
      const typeId = new Id(Number.parseInt(type.type.url.split("/")[6]));
      const typeName = new Name(type.type.name);
      if (!typeId || !typeName) {
        return Promise.reject("Error fetching the pokemon types");
      }
      return new PokemonType(typeName, typeId);
    });
    const moves: PokemonMove[] = [];
    for (let i = 0; i < Math.min(pokemonData.moves.length, 4); i++) {
      const move = pokemonData.moves[i];
      const moveInfo = await fetch(move.move.url);
      if (!moveInfo) {
        return Promise.reject("Error fetching the move info");
      }
      const moveData = await moveInfo.json(); // Extract JSON data from the response
      const moveId = new Id(moveData.id); // Access the 'id' property from the moveData
      const moveName = new Name(moveData.name);
      const movePower = new MovePower(moveData.power);
      const movePP = new MovePP(moveData.pp);
      const movePriority = new MovePriority(moveData.priority);
      const moveTypeId = new Id(
        Number.parseInt(moveData.type.url.split("/")[6])
      );
      const moveTypeName = new Name(moveData.type.name);
      if (!moveTypeId || !moveTypeName) {
        return Promise.reject("Error fetching the movement types");
      }
      const moveElementType = new PokemonType(moveTypeName, moveTypeId);
      const moveAccuracy = new MoveAccuracy(moveData.accuracy);
      const moveEffect = new MoveEffect(
        new EffectChance(moveData.effect_chance),
        new ShortEffect(moveData.effect_entries[0].short_effect)
      );
      const moveDamageClass = new MoveDamageClass(
        new Name(moveData.damage_class.name),
        new Id(Number.parseInt(moveData.damage_class.url.split("/")[6]))
      );
      moves.push(
        new PokemonMove(
          moveName,
          moveId,
          movePower,
          movePP,
          movePriority,
          moveElementType,
          moveAccuracy,
          moveEffect,
          moveDamageClass
        )
      );
    }
    const pokemon = new Pokemon(id, name, types, moves);
    return this.pokemonRepository.catchPokemonIntoDB(pokemon);
  }

  async setFreeAPokemonById(pokemonId: number): Promise<void> {
    try {
      return this.pokemonRepository.releasePokemonById(new Id(pokemonId));
    } catch (error: any) {
      throw error;
    }
  }

  async setFreeAPokemonByName(pokeName: string): Promise<void> {
    try {
      return this.pokemonRepository.releasePokemonByName(new Name(pokeName));
    } catch (error: any) {
      throw error;
    }
  }
}
