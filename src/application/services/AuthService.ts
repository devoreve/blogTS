import UserRepositoryInterface from "../../domain/repositories/UserRepositoryInterface";
import User from "../../domain/entities/User";

export class AuthService {
    constructor(private userRepository: UserRepositoryInterface) {}

    async register(email: string, password: string): Promise<User> {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) throw new Error("L'utilisateur existe déjà");

        return await this.userRepository.createUser(email, password);
    }

    async login(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findByEmail(email);
        if (!user || !(await user.comparePassword(password))) return null;
        return user;
    }
}