import {DataTypes, Model} from "sequelize";
import sequelize from "../../config/sequelize";
import UserModel from "./UserModel";

/**
 * Modèle sequelize des articles (lié à l'ORM)
 */
class PostModel extends Model {
    public id!: number | null;
    public title!: string;
    public content!: string;
    public userId!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

PostModel.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Users",
                key: "id",
            },
            onDelete: "CASCADE",
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
        tableName: "posts",
        timestamps: true
    });

PostModel.belongsTo(UserModel, { foreignKey: "userId" });

export default PostModel;