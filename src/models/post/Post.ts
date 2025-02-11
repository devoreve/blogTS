import {DataTypes, Model} from "sequelize";
import sequelize from "../../config/sequelize";

class Post extends Model {
    public id!: number | null;
    public title!: string;
    public content!: string;
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

export default Post;