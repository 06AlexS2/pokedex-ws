export type Primitives = string | string | number | boolean | boolean | null | undefined | Date;

export default abstract class ValueObject<T extends Primitives> {
  constructor(readonly value: T) {}

  private ensureIsValueObject(other: ValueObject<T>): void {
    if (other === null || other === undefined) {
      throw new Error('ValueObject can not be null or undefined');
    }
  }

  equals(other: ValueObject<T>): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return String(this.value);
  }
}