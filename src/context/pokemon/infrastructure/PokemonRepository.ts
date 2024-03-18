import Pokemon from "../domain/Pokemon";
import Id from "../domain/value_objects/general/Id";
import Name from "../domain/value_objects/general/Name";

export default interface PokemonRepository {
    catchPokemonIntoDB(pokemon: Pokemon): Promise<Pokemon>;
    releasePokemonById(id: Id): Promise<void>;
    releasePokemonByName(name: Name): Promise<void>;
    getAllPokedexEntries(): Promise<Pokemon[]>;
}