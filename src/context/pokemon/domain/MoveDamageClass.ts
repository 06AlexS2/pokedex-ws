import Id from "./value_objects/general/Id";
import MoveDamageName from "./value_objects/DamageClassName";
import Name from "./value_objects/general/Name";


export default class MoveDamageClass {
    readonly name: Name;
    readonly id: Id;
    constructor(name: Name, id: Id) {
        this.name = name;
        this.id = id;
    }

    public getName(): Name {
        return this.name;
    }

    public getId(): Id {
        return this.id;
    }
}