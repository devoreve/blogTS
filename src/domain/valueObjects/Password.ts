export default class Password {
    constructor(private readonly value: string) {
        if (value.length < 8) {
            throw new Error("Le mot de passe doit contenir au-moins 8 caractères.");
        }
    }

    get password(): string {
        return this.value;
    }
}