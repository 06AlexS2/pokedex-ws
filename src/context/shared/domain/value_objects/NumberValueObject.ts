import { isNumber } from "util";
import ValueObject from "./ValueObject";

export default class NumberValueObject extends ValueObject<number> {
    constructor(value: number) {
        super(value || 0);
        this.ensureIsValidNumber(this.value);
    }

    public getValue(): number {
        return this.value;
    }
    
    private ensureIsValidNumber(value: number): void {
        if (typeof value !== "number" || isNaN(value) || !isFinite(value)) {
            throw new Error('Invalid number');
        }
    }
}