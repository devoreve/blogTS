export default class Email {
    constructor(private readonly value: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
            throw new Error("Email invalide.");
        }
    }

    get email(): string {
        return this.value;
    }
}