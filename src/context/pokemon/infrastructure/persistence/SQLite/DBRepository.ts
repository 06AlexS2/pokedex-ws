import PokemonRepository from "../../PokemonRepository";
import { PrismaClient } from "@prisma/client";
import Pokemon from "../../../domain/Pokemon";
import Id from "../../../domain/value_objects/general/Id";
import Name from "../../../domain/value_objects/general/Name";
import PokemonType from "../../../domain/PokemonType";
import PokemonMove from "../../../domain/PokemonMove";
import MoveEffect from "../../../domain/PokemonMoveEffect";
import EffectChance from "../../../domain/value_objects/EffectChance";
import ShortEffect from "../../../domain/value_objects/ShortEffect";
import MovePower from "../../../domain/value_objects/MovePower";
import MovePP from "../../../domain/value_objects/MovePP";
import MovePriority from "../../../domain/value_objects/MovePriority";
import MoveAccuracy from "../../../domain/value_objects/MoveAccuracy";
import MoveDamageClass from "../../../domain/MoveDamageClass";

const prisma = new PrismaClient();

export default class SQLiteRepository implements PokemonRepository {
  //refactored
  async catchPokemonIntoDB(pokemon: Pokemon): Promise<Pokemon> {
    //verify if pokemon already exists
    const pokemonExists = await prisma.pokemon
      .findFirst({
        where: {
          id: pokemon.getId().getValue(),
        },
      })
      .catch((error) =>
        Promise.reject(new Error("Error while processing the operation."))
      );
    if (pokemonExists) {
      return Promise.reject(new Error("Pokemon already registered."));
    }
    //if not, insert the pokemon
    if (!pokemonExists) {
      await prisma.pokemon
        .create({
          data: {
            id: pokemon.getId().getValue(),
            name: pokemon.getName().getValue(),
          },
        })
        .catch((error) =>
          Promise.reject(new Error("Error while processing the operation."))
        );
    }
    //then, insert the element_types
    for (let pokemonType of pokemon.getTypes()) {
      let pokemonTypeExists = await prisma.element_types
        .findFirst({
          where: {
            id: pokemonType.getId().getValue(),
          },
        })
        .catch((error) =>
          Promise.reject(new Error("Error while processing the operation."))
        );
      if (!pokemonTypeExists) {
        await prisma.element_types
          .create({
            data: {
              id: pokemonType.getId().getValue(),
              name: pokemonType.getName().getValue(),
            },
          })
          .catch((error) =>
            Promise.reject(new Error("Error while processing the operation."))
          );
      }
    }
    //then, insert the moves
    for (let move of pokemon.getMoves()) {
      //move_types
      let moveTypeExists = await prisma.element_types
        .findFirst({
          where: {
            id: move.getElementType().getId().getValue(),
          },
        })
        .catch((error) =>
          Promise.reject(new Error("Error while processing the operation."))
        );
      if (!moveTypeExists) {
        await prisma.element_types
          .create({
            data: {
              id: move.getElementType().getId().getValue(),
              name: move.getElementType().getName().getValue(),
            },
          })
          .catch((error) =>
            Promise.reject(new Error("Error while processing the operation."))
          );
      }
      //damage_class
      let damageClassExists = await prisma.damage_classes
        .findFirst({
          where: {
            id: move.getDamageClass().getId().getValue(),
          },
        })
        .catch((error) =>
          Promise.reject(new Error("Error while processing the operation."))
        );
      if (!damageClassExists) {
        await prisma.damage_classes
          .create({
            data: {
              id: move.getDamageClass().getId().getValue(),
              name: move.getDamageClass().getName().getValue(),
            },
          })
          .catch((error) =>
            Promise.reject(new Error("Error while processing the operation."))
          );
      }
      //then, the move itself
      const moveExists = await prisma.moves
        .findFirst({
          where: {
            id: move.getId().getValue(),
          },
        })
        .catch((error) =>
          Promise.reject(new Error("Error while processing the operation."))
        );
      if (!moveExists) {
        await prisma.moves
          .create({
            data: {
              id: move.getId().getValue(),
              name: move.getName().getValue(),
              power: move.getPower().getValue(),
              pp: move.getPP().getValue(),
              priority: move.getPriority().getValue(),
              type_id: move.getElementType().getId().getValue(),
              accuracy: move.getAccuracy().getValue(),
              chance: move.getEffect().getChance().getValue(),
              short_effect: move.getEffect().getShortEffect().getValue(),
              damage_class_id: move.getDamageClass().getId().getValue(),
            },
          })
          .catch((error) =>
            Promise.reject(new Error("Error while processing the operation."))
          );
      }
      let pokemonMoveExists = await prisma.pokemon_moves
        .findFirst({
          where: {
            pokemon_id: pokemon.getId().getValue(),
            move_id: move.getId().getValue(),
          },
        })
        .catch((error) =>
          Promise.reject(new Error("Error while processing the operation."))
        );
      if (!pokemonMoveExists) {
        await prisma.pokemon_moves
          .create({
            data: {
              pokemon_id: pokemon.getId().getValue(),
              move_id: move.getId().getValue(),
            },
          })
          .catch((error) =>
            Promise.reject(new Error("Error while processing the operation."))
          );
      }
    }
    //finally, insert the pokemon_types
    for (let pokemonType of pokemon.getTypes()) {
      let pokemonTypeExists = await prisma.pokemon_types
        .findFirst({
          where: {
            pokemon_id: pokemon.getId().getValue(),
            type_id: pokemonType.getId().getValue(),
          },
        })
        .catch((error) =>
          Promise.reject(new Error("Error while processing the operation."))
        );
      if (!pokemonTypeExists) {
        await prisma.pokemon_types
          .create({
            data: {
              pokemon_id: pokemon.getId().getValue(),
              type_id: pokemonType.getId().getValue(),
            },
          })
          .catch((error) =>
            Promise.reject(new Error("Error while processing the operation."))
          );
      }
    }
    //if all goes well, return the promise resolved.
    return Promise.resolve(pokemon);
  }

  async releasePokemonById(id: Id): Promise<void> {
    //first check if the pokemon even exists in the records
    const pokemonExists = await prisma.pokemon
      .findFirst({
        where: {
          id: id.getValue(),
        },
      })
      .catch((error) =>
        Promise.reject(new Error("Error while processing the operation."))
      );
    if (!pokemonExists) {
      return Promise.reject(new Error("Pokemon not found."));
    }
    //then remove the pokemon_moves
    await prisma.pokemon_moves
      .deleteMany({
        where: {
          pokemon_id: id.getValue(),
        },
      })
      .catch((error) =>
        Promise.reject(new Error("Error while processing the operation."))
      );
    //then remove the pokemon_types
    await prisma.pokemon_types
      .deleteMany({
        where: {
          pokemon_id: id.getValue(),
        },
      })
      .catch((error) =>
        Promise.reject(new Error("Error while processing the operation."))
      );
    //then remove the pokemon
    await prisma.pokemon
      .delete({
        where: {
          id: id.getValue(),
        },
      })
      .catch(() =>
        Promise.reject(new Error("error while processing the operation."))
      );
    return Promise.resolve();
  }

  async releasePokemonByName(name: Name): Promise<void> {
    //first check if the pokemon even exists in the records
    const pokemonExists = await prisma.pokemon
      .findFirst({
        where: {
          name: name.getValue(),
        },
      })
      .catch((error) =>
        Promise.reject(new Error("Error while processing the operation."))
      );
    if (!pokemonExists) {
      return Promise.reject(new Error("Pokemon not found."));
    }
    //then remove the pokemon_moves
    await prisma.pokemon_moves
      .deleteMany({
        where: {
          pokemon_id: pokemonExists.id,
        },
      })
      .catch((error) =>
        Promise.reject(new Error("Error while processing the operation."))
      );

    //then remove the pokemon_types
    await prisma.pokemon_types
      .deleteMany({
        where: {
          pokemon_id: pokemonExists.id,
        },
      })
      .catch((error) =>
        Promise.reject(new Error("Error while processing the operation."))
      );

    //then remove the pokemon
    await prisma.pokemon
      .delete({
        where: {
          id: pokemonExists.id,
        },
      })
      .catch((error) =>
        Promise.reject(new Error("Error while processing the operation."))
      );
    return Promise.resolve();
  }

  async getAllPokedexEntries(): Promise<Pokemon[]> {
    const pokedex = await prisma.pokemon
      .findMany()
      .catch((error) =>
        Promise.reject(new Error("Error while processing the operation."))
      );

    if (!pokedex) {
      return Promise.reject(new Error("No pokemon entries."));
    }

    //build the pokemon array
    const pokemonList: Pokemon[] = [];
    for (const pokemon of pokedex) {
      const types = await prisma.pokemon_types
        .findMany({
          where: { pokemon_id: pokemon.id },
        })
        .catch((error) =>
          Promise.reject(new Error("Error while processing the operation."))
        );
      const moves = await prisma.pokemon_moves
        .findMany({
          where: { pokemon_id: pokemon.id },
        })
        .catch((error) =>
          Promise.reject(new Error("Error while processing the operation."))
        );
      const pokemonTypes: PokemonType[] = [];
      const pokemonMoves: PokemonMove[] = [];

      for (const type of types) {
        const elementType = await prisma.element_types
          .findUnique({
            where: { id: type.type_id },
          })
          .catch((error) =>
            Promise.reject(new Error("Error while processing the operation."))
          );
        if (elementType) {
          const pokemonType = new PokemonType(
            new Name(elementType.name),
            new Id(elementType.id)
          );
          pokemonTypes.push(pokemonType);
        }
      }

      for (const move of moves) {
        const moveData = await prisma.moves
          .findUnique({
            where: { id: move.move_id },
          })
          .catch((error) =>
            Promise.reject(new Error("Error while processing the operation."))
          );
        if (moveData) {
          const moveElementType = await prisma.element_types
            .findUnique({
              where: { id: moveData.type_id },
            })
            .catch((error) =>
              Promise.reject(new Error("Error while processing the operation."))
            );
          const damageClass = await prisma.damage_classes
            .findUnique({
              where: { id: moveData.damage_class_id },
            })
            .catch((error) =>
              Promise.reject(new Error("Error while processing the operation."))
            );
          const effect = new MoveEffect(
            new EffectChance(moveData.chance),
            new ShortEffect(moveData.short_effect)
          );
          const moveObj = new PokemonMove(
            new Name(moveData.name),
            new Id(moveData.id),
            new MovePower(moveData.power),
            new MovePP(moveData.pp),
            new MovePriority(moveData.priority),
            new PokemonType(
              new Name(moveElementType?.name || ""),
              new Id(moveElementType?.id || 0)
            ),
            new MoveAccuracy(moveData.accuracy),
            effect,
            new MoveDamageClass(
              new Name(damageClass?.name || ""),
              new Id(damageClass?.id || 0)
            )
          );
          pokemonMoves.push(moveObj);
        }
      }

      const pokemonObj = new Pokemon(
        new Id(pokemon.id),
        new Name(pokemon.name),
        pokemonTypes,
        pokemonMoves
      );
      pokemonList.push(pokemonObj);
    }

    return Promise.resolve(pokemonList);
  }

  async releaseManyPokemonByType(type: Name): Promise<void> {
    //first check if type exists in db records
    const typeExists = await prisma.element_types
      .findFirst({
        where: {
          name: type.getValue(),
        },
      })
      .catch((error) =>
        Promise.reject(new Error("Error while processing the operation."))
      );
    if (!typeExists) {
      return Promise.reject(new Error("Pokemon Type not found."));
    }
    //if it exists, get all the pokemon that has it
    const pokemonByType = await prisma.pokemon_types
      .findMany({
        where: {
          type_id: typeExists.id,
        },
      })
      .catch((error) =>
        Promise.reject(new Error("Error while processing the operation."))
      );
    if (!pokemonByType) {
      return Promise.reject(new Error("Pokemon not found."));
    }
    for (let pokemon of pokemonByType) {
      //then, with that, first delete the pokemon_moves
      await prisma.pokemon_moves
        .deleteMany({
          where: {
            pokemon_id: pokemon.pokemon_id,
          },
        })
        .catch((error) =>
          Promise.reject(new Error("Error while processing the operation."))
        );
      //then, delete the pokemon_types
      await prisma.pokemon_types
        .deleteMany({
          where: {
            pokemon_id: pokemon.pokemon_id,
          },
        })
        .catch((error) =>
          Promise.reject(new Error("Error while processing the operation."))
        );
      //finally, delete the pokemon
      await prisma.pokemon
        .delete({
          where: {
            id: pokemon.pokemon_id,
          },
        })
        .catch((error) =>
          Promise.reject(new Error("Error while processing the operation."))
        );
    }
    return Promise.resolve();
  }
}
