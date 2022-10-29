import { DataType } from "sequelize-typescript";
import { sequelize } from "../database/database";

export const User = sequelize.define('user', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userName: {
        type: DataType.STRING,
        allowNull: false
    },
    password: {
        type: DataType.STRING,
        allowNull: false
    },
    email: {
        type: DataType.STRING,
        allowNull: false
    },
    banned: {
        type: DataType.BOOLEAN,
        defaultValue: false
    },
    isAdmin: {
        type: DataType.BOOLEAN,
        defaultValue: false
    }
});
