export default class User {
    constructor(
        private _id: number,
        private _email: string,
        private _password: string,
        private _createdAt: Date,
        private _updatedAt: Date
    ) {
        this.email = _email;
        this.password = _password;
    }

    static validateEmail(email: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Email invalide.");
        }
    }

    static validatePassword(password: string): void {
        if (password.length < 8) {
            throw new Error("Le mot de passe doit contenir au moins 8 caractères.");
        }
    }

    get id(): number {
        return this._id;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        User.validateEmail(value);
        this._email = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        User.validatePassword(value);
        this._password = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(value: Date) {
        this._createdAt = value;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    set updatedAt(value: Date) {
        this._updatedAt = value;
    }
}