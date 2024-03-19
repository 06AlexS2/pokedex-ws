import Id from "./value_objects/general/Id";
import Name from "./value_objects/general/Name";

export default class PokemonType {
  constructor(private name: Name, private id: Id) {
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
