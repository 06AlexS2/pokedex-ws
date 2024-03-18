import PokemonRepository from "../../PokemonRepository";
import { PrismaClient } from "@prisma/client";
import Pokemon from "../../../domain/Pokemon";
import Id from "../../../domain/value_objects/general/Id";
import Name from "../../../domain/value_objects/general/Name";

const prisma = new PrismaClient();

// export default class SQLiteRepository implements PokemonRepository {
//   async catchPokemonIntoDB(pokemon: Pokemon): Promise<void> {
//     const existingPokemon = await prisma.pokemon.findUnique({
//       where: {
//         id: pokemon.getId().getValue(),
//       },
//     });

//     if (existingPokemon) {
//       return Promise.reject("Pokemon already registered in the pokedex!");
//     } else {
//       // Pokemon does not exist in the database, create a new record
//       await prisma.pokemon.create({
//         data: {
//           id: pokemon.getId().getValue(),
//           name: pokemon.getName().getValue(),
//         },
//       });
//     }

//     // Create or update the types
//     for (const type of pokemon.getTypes()) {
//       const existingType = await prisma.element_types.findUnique({
//         where: {
//           id: type.getId().getValue(),
//         },
//       });

//       if (existingType) {
//         // Type already exists in the database
//         await prisma.pokemon_types.create({
//           data: {
//             pokemon_id: pokemon.getId().getValue(),
//             type_id: type.getId().getValue(),
//           },
//         });
//       } else {
//         // Type does not exist in the database, create a new record
//         await prisma.element_types.create({
//           data: {
//             id: type.getId().getValue(),
//             name: type.getName().getValue(),
//           },
//         });
//         await prisma.pokemon_types.create({
//           data: {
//             pokemon_id: pokemon.getId().getValue(),
//             type_id: type.getId().getValue(),
//           },
//         });
//       }
//     }

//     // Create or update the moves
//     for (const move of pokemon.getMoves()) {
//       const existingDamageClass = await prisma.damage_classes.findUnique({
//         where: {
//           id: move.getDamageClass().getId().getValue(),
//         },
//       });
//       if (!existingDamageClass) {
//         await prisma.damage_classes.create({
//           data: {
//             id: move.getDamageClass().getId().getValue(),
//             name: move.getDamageClass().getName().getValue(),
//           },
//         });
//       }
//       const existingMove = await prisma.moves.findUnique({
//         where: {
//           id: move.getId().getValue(),
//         },
//       });

//       if (!existingMove) {
//         await prisma.moves.create({
//           data: {
//             id: move.getId().getValue(),
//             name: move.getName().getValue(),
//             power: move.getPower().getValue(),
//             pp: move.getPP().getValue(),
//             priority: move.getPriority().getValue(),
//             type_id: move.getElementType().getId().getValue(),
//             accuracy: move.getAccuracy().getValue(),
//             chance: move.getEffect().getChance().getValue(),
//             short_effect: move.getEffect().getShortEffect().getValue(),
//             damage_class_id: move.getDamageClass().getId().getValue(),
//           },
//         });
//       }
//       const existingPokemonMove = await prisma.pokemon_moves.findFirst({
//         where: {
//           pokemon_id: pokemon.getId().getValue(),
//           move_id: move.getId().getValue(),
//         },
//       });
//       if (!existingPokemonMove) {
//         await prisma.pokemon_moves.create({
//           data: {
//             pokemon_id: pokemon.getId().getValue(),
//             move_id: move.getId().getValue(),
//           },
//         });
//       }
//     }
//   }
// }

export default class SQLiteRepository implements PokemonRepository {
  async catchPokemonIntoDB(pokemon: Pokemon): Promise<Pokemon> {
    //then the moves
    //then the pokemon_types
    //then the pokemon_moves
    //first, insert the element_types for pokemon
    for (let pokemonType of pokemon.getTypes()) {
      let pokemonTypeExists = await prisma.element_types.findFirst({
        where: {
          id: pokemonType.getId().getValue(),
        },
      });
      if (!pokemonTypeExists) {
        await prisma.element_types.create({
          data: {
            id: pokemonType.getId().getValue(),
            name: pokemonType.getName().getValue(),
          },
        });
      }
    }
    //then for move
    for (let move of pokemon.getMoves()) {
      let moveTypeExists = await prisma.element_types.findFirst({
        where: {
          id: move.getElementType().getId().getValue(),
        },
      });
      if (!moveTypeExists) {
        await prisma.element_types.create({
          data: {
            id: move.getElementType().getId().getValue(),
            name: move.getElementType().getName().getValue(),
          },
        });
      }
    }
    //then insert the damage_classes
    for (let move of pokemon.getMoves()) {
      let damageClassExists = await prisma.damage_classes.findFirst({
        where: {
          id: move.getDamageClass().getId().getValue(),
        },
      });
      if (!damageClassExists) {
        await prisma.damage_classes.create({
          data: {
            id: move.getDamageClass().getId().getValue(),
            name: move.getDamageClass().getName().getValue(),
          },
        });
      }
    }
    //then insert the pokemon
    const pokemonExists = await prisma.pokemon.findFirst({
      where: {
        id: pokemon.getId().getValue(),
      },
    });

    if (!pokemonExists) {
      await prisma.pokemon.create({
        data: {
          id: pokemon.getId().getValue(),
          name: pokemon.getName().getValue(),
        },
      });
    }

    //then insert the moves
    for (let move of pokemon.getMoves()) {
      //first validate if the move exists
      const moveExists = await prisma.moves.findFirst({
        where: {
          id: move.getId().getValue(),
        },
      });
      if (!moveExists) {
        await prisma.moves.create({
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
        });
      }
    }
    //then insert the pokemon_types
    for (let pokemonType of pokemon.getTypes()) {
      let pokemonTypeExists = await prisma.pokemon_types.findFirst({
        where: {
          pokemon_id: pokemon.getId().getValue(),
          type_id: pokemonType.getId().getValue(),
        },
      });
      if (!pokemonTypeExists) {
        await prisma.pokemon_types.create({
          data: {
            pokemon_id: pokemon.getId().getValue(),
            type_id: pokemonType.getId().getValue(),
          },
        });
      }
    }

    //then insert the pokemon_moves
    for (let move of pokemon.getMoves()) {
      let pokemonMoveExists = await prisma.pokemon_moves.findFirst({
        where: {
          pokemon_id: pokemon.getId().getValue(),
          move_id: move.getId().getValue(),
        },
      });
      if (!pokemonMoveExists) {
        await prisma.pokemon_moves.create({
          data: {
            pokemon_id: pokemon.getId().getValue(),
            move_id: move.getId().getValue(),
          },
        });
      }
    }
    return Promise.resolve(pokemon);
  }

  async releasePokemonById(id: Id): Promise<void> {
    //first check if the pokemon even exists in the records
    const pokemonExists = await prisma.pokemon.findFirst({
      where: {
        id: id.getValue(),
      },
    });
    if (!pokemonExists) {
      return Promise.reject(new Error("Pokemon not found."));
    }
    //then remove the pokemon_moves
    await prisma.pokemon_moves.deleteMany({
      where: {
        pokemon_id: id.getValue(),
      },
    });
    //then remove the pokemon_types
    await prisma.pokemon_types.deleteMany({
      where: {
        pokemon_id: id.getValue(),
      },
    });
    //then remove the pokemon
    await prisma.pokemon.delete({
      where: {
        id: id.getValue(),
      },
    });
    return Promise.resolve();
  }

  async releasePokemonByName(name: Name): Promise<void> {
    //first check if the pokemon even exists in the records
    const pokemonExists = await prisma.pokemon.findFirst({
      where: {
        name: name.getValue(),
      },
    });
    if (!pokemonExists) {
      return Promise.reject(new Error("Pokemon not found."));
    }
    //then remove the pokemon_moves
    await prisma.pokemon_moves.deleteMany({
      where: {
        pokemon_id: pokemonExists.id,
      },
    });

    //then remove the pokemon_types
    await prisma.pokemon_types.deleteMany({
      where: {
        pokemon_id: pokemonExists.id,
      },
    });

    //then remove the pokemon
    await prisma.pokemon.delete({
      where: {
        id: pokemonExists.id,
      },
    });
    return Promise.resolve();
  }
}
