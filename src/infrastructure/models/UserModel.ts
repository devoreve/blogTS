import {DataTypes, Model} from "sequelize";
import sequelize from "../../config/sequelize";

class UserModel extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

UserModel.init(
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

export default UserModel;