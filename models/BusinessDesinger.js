const { Sequelize, DataTypes } = require('sequelize');
const Business = require('./Business');
const sequelize = require('.').sequelize;

const BusinessDesinger = sequelize.define('TB_BUSINESSES_DESINGER', {
    business_desinger_id: {
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
    business_desinger_name: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: '',
    },
    business_desinger_introduce: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: '',
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
BusinessDesinger.belongsTo(Business, { foreignKey: 'business_registration_number', targetKey: 'business_registration_number' });

module.exports = BusinessDesinger;