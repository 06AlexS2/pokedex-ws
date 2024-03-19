import AggregateRoot from "../../shared/domain/aggregate/AggregateRoot";
import Id from "./value_objects/general/Id";
import Name from "./value_objects/general/Name";
import PokemonType from "./PokemonType";
import PokemonMove from "./PokemonMove";
import DamageClassName from "./value_objects/DamageClassName";
import MoveAccuracy from "./value_objects/MoveAccuracy";
import MovePP from "./value_objects/MovePP";
import MovePower from "./value_objects/MovePower";
import MovePriority from "./value_objects/MovePriority";
import MoveEffect from "./PokemonMoveEffect";
import MoveDamageClass from "./MoveDamageClass";
import EffectChance from "./value_objects/EffectChance";
import ShortEffect from "./value_objects/ShortEffect";

type PrimitiveType = {
  id: number;
  name: string;
};

type PrimitiveEffect = {
  chance: number;
  short_effect: string;
};

type PrimitiveDamageClass = {
  name: string;
  id: number;
};

type PrimitiveMove = {
  id: number;
  name: string;
  power: number;
  pp: number;
  priority: number;
  element_type: PrimitiveType;
  accuracy: number;
  effect: PrimitiveEffect;
  damage_class: PrimitiveDamageClass;
};

type PokemonPrimitive = {
  id: number;
  name: string;
  types: PrimitiveType[];
  moves: PrimitiveMove[];
};

export default class Pokemon extends AggregateRoot {
  readonly id: Id;
  readonly name: Name;
  readonly types: PokemonType[];
  readonly moves: PokemonMove[];

  constructor(id: Id, name: Name, types: PokemonType[], moves: PokemonMove[]) {
    super();
    this.id = id;
    this.name = name;
    this.types = types;
    this.moves = moves;
  }

  toPrimitive(): PokemonPrimitive {
    return {
      id: this.id.value,
      name: this.name.value,
      types: this.types.map((type) => {
        return {
          id: type.getId().value,
          name: type.getName().value,
        };
      }),
      moves: this.moves.map((move) => {
        return {
          id: move.getId().value,
          name: move.getName().value,
          power: move.getPower().value,
          pp: move.getPP().value,
          priority: move.getPriority().value,
          element_type: {
            id: move.getElementType().getId().value,
            name: move.getElementType().getName().value,
          },
          accuracy: move.getAccuracy().value,
          effect: {
            chance: move.getEffect().chance.value,
            short_effect: move.getEffect().shortEffect.value,
          },
          damage_class: {
            name: move.getDamageClass().name.value,
            id: move.getDamageClass().id.value,
          },
        };
      }),
    };
  }

  static primitiveToAggregate(primitive: PokemonPrimitive): Pokemon {
    return new Pokemon(
      new Id(primitive.id),
      new Name(primitive.name),
      primitive.types.map(
        (type) => new PokemonType(new Name(type.name), new Id(type.id))
      ),
      primitive.moves.map((move) => {
        return new PokemonMove(
          new Name(move.name),
          new Id(move.id),
          new MovePower(move.power),
          new MovePP(move.pp),
          new MovePriority(move.priority),
          new PokemonType(
            new Name(move.element_type.name),
            new Id(move.element_type.id)
          ),
          new MoveAccuracy(move.accuracy),
          new MoveEffect(new EffectChance(move.effect.chance), new ShortEffect(move.effect.short_effect)),
          new MoveDamageClass(new Name(move.damage_class.name), new Id(move.damage_class.id))
        );
      })
    );
  }

  public getId(): Id {
    return this.id;
  }

  public getName(): Name {
    return this.name;
  }

  public getTypes(): PokemonType[] {
    return this.types;
  }

  public getMoves(): PokemonMove[] {
    return this.moves;
  }
}
