import User from "../../domain/entities/User";
import UserRepositoryInterface from "../../domain/repositories/UserRepositoryInterface";
import UserModel from "../models/UserModel";
import {UserMapper} from "../mappers/UserMapper";

export class UserRepository implements UserRepositoryInterface{
    async findByEmail(email: string): Promise<User | null> {
        const userModel = await UserModel.findOne({ where: { email } });
        return userModel ? UserMapper.toDomain(userModel) : null;
    }

    async findById(id: number): Promise<User | null> {
        const userModel = await UserModel.findByPk(id);
        return userModel ? UserMapper.toDomain(userModel) : null;
    }

    async createUser(email: string, password: string): Promise<User> {
        const userModel = await UserModel.create({ email, password });
        return UserMapper.toDomain(userModel);
    }
}