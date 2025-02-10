import {DataTypes, Model} from "sequelize";
import sequelize from "../config/database";

class Post extends Model {
    public id!: number | null;
    public title!: string;
    public content!: string;
    public created_at!: Date;
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
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: "posts",
        timestamps: false
    });

export default Post;