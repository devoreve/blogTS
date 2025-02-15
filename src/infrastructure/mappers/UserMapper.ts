import UserModel from "../models/UserModel";
import User from "../../domain/entities/User";

/**
 * Transforme un objet UserModel (modèle ORM) en User (entité métier)
 * Et vice-versa
 */
export class UserMapper {
    static toDomain(userModel: UserModel): User {
        return new User(
            userModel.id,
            userModel.email,
            userModel.password,
            userModel.createdAt,
            userModel.updatedAt
        );
    }

    static toPersistence(user: User): any {
        return {
            id: user.id,
            email: user.email,
            password: user.password,
        };
    }
}