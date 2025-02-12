import UserRepositoryInterface from "../../domain/repositories/UserRepositoryInterface";
import User from "../../domain/entities/User";
import {PasswordService} from "./PasswordService";
import UserDTO from "../dtos/UserDTO";

export class AuthService {
    constructor(private userRepository: UserRepositoryInterface) {}

    async register(email: string, password: string, confirmPassword: string): Promise<UserDTO> {
        if (password !== confirmPassword) {
            throw new Error("Les mots de passe ne correspondent pas");
        }

        User.validateEmail(email);
        User.validatePassword(password);

        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) throw new Error("L'utilisateur existe déjà");

        const hashedPassword = await PasswordService.hashPassword(password);
        const user: User = await this.userRepository.createUser(email, hashedPassword);

        return new UserDTO(user.id, user.email);
    }

    async login(email: string, password: string): Promise<UserDTO> {
        const user = await this.userRepository.findByEmail(email);

        if (!user || !(await PasswordService.comparePassword(password, user.password)))
            throw new Error("L'utilisateur n'existe pas ou le mot de passe est erroné");

        return new UserDTO(user.id, user.email);
    }
}