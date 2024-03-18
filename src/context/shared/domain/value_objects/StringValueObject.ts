import ValueObject from "./ValueObject";

export default class StringValueObject extends ValueObject<string> {
    constructor(value: string) {
        super(value);
        this.ensureIsValidString(value);
    }

    public getValue(): string {
        return this.value;
    }
    
    private ensureIsValidString(value: string): void {
        if (typeof(value) !== "string" || value === null || value === undefined) {
            throw new Error('Invalid string');
        }
    }
}