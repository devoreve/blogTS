import User from "../entities/User";
export default interface UserRepositoryInterface {
    findByEmail(email: string): Promise<User | null>;
    createUser(email: string, password: string): Promise<User>;
}