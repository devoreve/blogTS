import { describe, test, expect } from "vitest";
import Post from "../src/domain/entities/Post";

describe("Post", () => {
    test("Devrait créer un post valide", () => {
        const post: Post = new Post(1, "Titre valide", "Contenu valide", 1, new Date(), new Date());
        expect(post.title).toBe("Titre valide");
        expect(post.content).toBe("Contenu valide");
        expect(post.userId).toBe(1);
    });

    test("Devrait lever une erreur si le titre est trop court", () => {
        expect(() => new Post(1, "Hi", "Contenu valide", 1, new Date(), new Date())).toThrow("Le titre doit faire au-moins 3 caractères");
    });

    test("Devrait lever une erreur si le contenu est trop court", () => {
        expect(() => new Post(1, "Titre valide", "Hi", 1, new Date(), new Date())).toThrow("L'article doit faire au-moins 3 caractères");
    });

    test("Devrait permettre de modifier le titre avec un titre valide", () => {
        const post = new Post(1, "Ancien titre", "Contenu valide", 1, new Date(), new Date());
        post.title = "Nouveau titre";
        expect(post.title).toBe("Nouveau titre");
    });

    test("Devrait lever une erreur lors de la modification du titre avec une valeur invalide", () => {
        const post = new Post(1, "Titre valide", "Contenu valide", 1, new Date(), new Date());
        expect(() => { post.title = "Hi"; }).toThrow("Le titre doit faire au-moins 3 caractères");
    });
});