import User from "../entities/User";

/**
 * Les méthodes qui seront implémentées dans les classes concrètes
 */
export default interface UserRepositoryInterface {
    findByEmail(email: string): Promise<User | null>;
    createUser(email: string, password: string): Promise<User>;
}