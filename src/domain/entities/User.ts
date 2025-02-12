export default class User {
    constructor(
        public id: number,
        public email: string,
        public password: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {
        User.validateEmail(email);
        User.validatePassword(password);
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
}