import UserRepositoryInterface from "../../domain/repositories/UserRepositoryInterface";
import User from "../../domain/entities/User";
import {PasswordService} from "./PasswordService";
import UserDTO from "../dtos/UserDTO";

export class AuthService {
    constructor(private userRepository: UserRepositoryInterface) {}

    async register(email: string, password: string, confirmPassword: string): Promise<UserDTO> {
        // On vérifie que le mot de passe est bien confirmé
        // Comme le champ "Confirmation du mot de passe" n'est pas une donnée de l'entité User
        // et que cette vérification n'est effectuée qu'une seule fois,
        // on gère ce cas ici et non dans l'entité métier
        if (password !== confirmPassword) {
            throw new Error("Les mots de passe ne correspondent pas");
        }

        // On récupère l'utilisateur si jamais il existe
        const existingUser: User | null = await this.userRepository.findByEmail(email);

        // Si c'est le cas on déclenche une erreur
        if (existingUser) {
            throw new Error("L'utilisateur existe déjà");
        }

        // On hache le mot de passe grâce au service dédié
        const hashedPassword: string = await PasswordService.hashPassword(password);

        // On récupère l'objet métier créé
        const user: User = await this.userRepository.createUser(email, hashedPassword);

        // On renvoie un DTO avec les données que l'on souhaite exposer à la couche présentation
        return new UserDTO(user.id, user.email);
    }

    async login(email: string, password: string): Promise<UserDTO> {
        const user: User | null = await this.userRepository.findByEmail(email);

        if (!user || !(await PasswordService.comparePassword(password, user.password)))
            throw new Error("L'utilisateur n'existe pas ou le mot de passe est erroné");

        return new UserDTO(user.id, user.email);
    }
}