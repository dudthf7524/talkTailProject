const { Sequelize, DataTypes } = require('sequelize');
const User = require('./User');
const sequelize = require('.').sequelize;

const userInformation = sequelize.define('USER_INFORMATION', {
    user_information_id: {
        type: DataTypes.INTEGER, // 숫자 타입으로 변경
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, // 자동 증가 설정
    },
    platform_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
    },
    user_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    user_phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
});
userInformation.belongsTo(User, { foreignKey: 'platform_id', targetKey: 'platform_id' });

module.exports = userInformation;