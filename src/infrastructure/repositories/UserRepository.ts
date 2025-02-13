import User from "../../domain/entities/User";
import UserRepositoryInterface from "../../domain/repositories/UserRepositoryInterface";
import UserModel from "../models/UserModel";
import {UserMapper} from "../mappers/UserMapper";

/**
 * Implémentation du repository des utilisateurs
 */
export class UserRepository implements UserRepositoryInterface{
    async findByEmail(email: string): Promise<User | null> {
        const userModel: UserModel | null = await UserModel.findOne({ where: { email } });

        // On transforme l'objet de l'orm en objet métier puis on le retourne
        return userModel ? UserMapper.toDomain(userModel) : null;
    }

    async createUser(email: string, password: string): Promise<User> {
        const userModel: UserModel = await UserModel.create({ email, password });

        // On transforme l'objet de l'orm en objet métier puis on le retourne
        return UserMapper.toDomain(userModel);
    }
}