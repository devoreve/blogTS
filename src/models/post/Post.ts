import {DataTypes, Model} from "sequelize";
import sequelize from "../../config/sequelize";
import User from "../user/User";

class Post extends Model {
    public id!: number | null;
    public title!: string;
    public content!: string;
    public userId!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Post.init({
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

Post.belongsTo(User, { foreignKey: "userId" });

export default Post;