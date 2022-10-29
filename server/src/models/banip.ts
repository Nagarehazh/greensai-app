import { DataType } from 'sequelize-typescript'
import { sequelize } from '../database/database'
import { User } from './user'

export const BanIp = sequelize.define('banip', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ip: {
        type: DataType.STRING,
        allowNull: false
    }
})

User.hasMany(BanIp, { foreignKey: 'userId', sourceKey: 'id' })
BanIp.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' })

