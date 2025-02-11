import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/sequelize";
import bcrypt from "bcrypt";

class User extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
    public createdAt!: Date;
    public updatedAt!: Date;

    async comparePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        tableName: "users",
        timestamps: true
    }
);

User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
});

export default User;