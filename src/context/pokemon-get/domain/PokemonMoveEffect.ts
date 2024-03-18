import EffectChance from "./value_objects/EffectChance";
import ShortEffect from "./value_objects/ShortEffect";

export default class MoveEffect {
    readonly chance: EffectChance;
    readonly shortEffect: ShortEffect;
    constructor(chance: EffectChance, shortEffect: ShortEffect) {
        this.chance = chance;
        this.shortEffect = shortEffect;
    }

    public getChance(): EffectChance {
        return this.chance;
    }

    public getShortEffect(): ShortEffect {
        return this.shortEffect;
    }
}