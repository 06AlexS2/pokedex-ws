export class LanguageValueObject {
    private readonly value: string;

    private static readonly ALLOWED_LANGUAGES = ['es', 'en'];

    constructor(value: string) {
        this.value = value;
    }

    public static create(value: string): LanguageValueObject {
        const language = value.toLowerCase();

        if (!LanguageValueObject.ALLOWED_LANGUAGES.includes(language)) {
            throw new Error('Invalid language');
        }

        return new LanguageValueObject(language);
    }

    public getValue(): string {
        return this.value;
    }
}