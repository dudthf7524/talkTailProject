const { Sequelize, DataTypes } = require('sequelize');
const Business = require('./Business');
const User = require('./User');
const sequelize = require('.').sequelize;

const UserAuthorityRequest = sequelize.define('USER_ AUTHORITY_REQUEST', {
    user_authority_request_id: {
        type: DataTypes.INTEGER, // 숫자 타입으로 변경
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, // 자동 증가 설정
    },
    business_registration_number: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
            model: Business, // Users 테이블을 참조
            key: 'business_registration_number', 
        },
        onUpdate: 'CASCADE', // 외래 키 업데이트 정책
        onDelete: 'CASCADE', // 외래 키 삭제 정책
    },
    platform_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    authority_is_available:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
UserAuthorityRequest.belongsTo(User, { foreignKey: 'platform_id', targetKey: 'platform_id' });
UserAuthorityRequest.belongsTo(Business, { foreignKey: 'business_registration_number', targetKey: 'business_registration_number' });

module.exports = UserAuthorityRequest;