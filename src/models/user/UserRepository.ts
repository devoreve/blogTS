import User from "./User";

export class UserRepository {
    async findByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email } });
    }

    async findById(id: number): Promise<User | null> {
        return await User.findByPk(id);
    }

    async createUser(email: string, password: string): Promise<User> {
        return await User.create({ email, password });
    }
}