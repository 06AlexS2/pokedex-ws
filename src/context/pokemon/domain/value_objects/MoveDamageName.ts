import StringValueObject from "../../../shared/domain/value_objects/StringValueObject";

export default class MoveDamageName extends StringValueObject {
    private static readonly VALID_VALUES= ["physical", "special", "status"];

    constructor(value: string) {
        super(value);
        this.ensureValidValue();
    }

    private ensureValidValue(): void {
        if (!MoveDamageName.VALID_VALUES.includes(this.value)) {
            throw new Error("Invalid move type name");
        }
    }
}