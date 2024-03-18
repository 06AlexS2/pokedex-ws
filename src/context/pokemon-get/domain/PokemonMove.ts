import MoveDamageClass from "./MoveDamageClass";
import MoveEffect from "./PokemonMoveEffect";
import PokemonType from "./PokemonType";
import DamageClassName from "./value_objects/DamageClassName";
import EffectChance from "./value_objects/EffectChance";
import MoveAccuracy from "./value_objects/MoveAccuracy";
import MovePP from "./value_objects/MovePP";
import MovePower from "./value_objects/MovePower";
import MovePriority from "./value_objects/MovePriority";
import ShortEffect from "./value_objects/ShortEffect";
import Id from "./value_objects/general/Id";
import Name from "./value_objects/general/Name";

export default class PokemonMove {
    //Move
    //id: number;
    //name: string;
    //power: number;
    //pp: number;
    //priority: number;
    //element_type: element_type;
    //accuracy: number;
    //effect: Effect;
    //damage_class: DamageClass;
    
    //MoveEffect:
    //chance: number;
    //short_effect: string;  (effect_entries)

    //DamageClass:
    //name: string;
    //id: number;
    constructor(private name: Name, private id: Id, private power: MovePower, private pp: MovePP, private priority: MovePriority, private elementType: PokemonType, private accuracy: MoveAccuracy, private effect: MoveEffect, private damageClass: MoveDamageClass) {
        this.name = name;
        this.id = id;
        this.power = power;
        this.pp = pp;
        this.priority = priority;
        this.elementType = elementType;
        this.accuracy = accuracy;
        this.effect = effect;
        this.damageClass = damageClass;
    }

    public getName(): Name {
        return this.name;
    }

    public getId(): Id {
        return this.id;
    }
    
    public getPower(): MovePower {
        return this.power;
    }

    public getPP(): MovePP {
        return this.pp;
    }

    public getPriority(): MovePriority {
        return this.priority;
    }

    public getElementType(): PokemonType {
        return this.elementType;
    }

    public getAccuracy(): MoveAccuracy {
        return this.accuracy;
    }

    public getEffect(): MoveEffect {
        return this.effect;
    }

    public getDamageClass(): MoveDamageClass {
        return this.damageClass;
    }

    // public toPrimitive() {
    //     return {
    //         id: this.id.value,
    //         name: this.name.value,
    //         power: this.power.value,
    //         pp: this.pp.value,
    //         priority: this.priority.value,
    //         elementType: {
    //             id: this.elementType.getId().value,
    //             name: this.elementType.getName().value
    //         },
    //         accuracy: this.accuracy.value,
    //         effect: {
    //             chance: this.effect.chance.value,
    //             description: this.effect.description.value
    //         },
    //         damageClass: {
    //             name: this.damageClass.name.value,
    //             id: this.damageClass.id.value
    //         }
    //     }
    // }
}