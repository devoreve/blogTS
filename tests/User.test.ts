import { describe, test, expect } from "vitest";
import User from "../src/domain/entities/User";

describe("User", () => {
    test("Devrait créer un utilisateur valide", () => {
        const user = new User(1, "test@example.com", "password123", new Date(), new Date());
        expect(user.email).toBe("test@example.com");
        expect(user.password).toBe("password123");
    });

    test("Devrait lever une erreur pour un email invalide", () => {
        expect(() => new User(1, "invalid-email", "password123", new Date(), new Date())).toThrow("Email invalide.");
    });

    test("Devrait lever une erreur pour un mot de passe trop court", () => {
        expect(() => new User(1, "test@example.com", "12345", new Date(), new Date())).toThrow("Le mot de passe doit contenir au moins 8 caractères.");
    });

    test("Devrait permettre de modifier l'email avec un email valide", () => {
        const user = new User(1, "test@example.com", "password123", new Date(), new Date());
        user.email = "new@example.com";
        expect(user.email).toBe("new@example.com");
    });

    test("Devrait lever une erreur lors de la modification de l'email avec une valeur invalide", () => {
        const user = new User(1, "test@example.com", "password123", new Date(), new Date());
        expect(() => { user.email = "invalid-email"; }).toThrow("Email invalide.");
    });

    test("Devrait permettre de modifier le mot de passe avec un mot de passe valide", () => {
        const user = new User(1, "test@example.com", "password123", new Date(), new Date());
        user.password = "newpassword";
        expect(user.password).toBe("newpassword");
    });

    test("Devrait lever une erreur lors de la modification du mot de passe avec une valeur invalide", () => {
        const user = new User(1, "test@example.com", "password123", new Date(), new Date());
        expect(() => { user.password = "short"; }).toThrow("Le mot de passe doit contenir au moins 8 caractères.");
    });
});