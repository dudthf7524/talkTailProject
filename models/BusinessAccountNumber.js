module.exports = (sequelize, DataTypes) => {
    const BusinessAccountNumber = sequelize.define(
        'BUSINESS_ACCOUNT_NUMBER',
        {
            business_registration_number: {
                type: DataTypes.STRING(200),
                allowNull: false,
                defaultValue: '',
                references: {
                    model: 'BUSINESS', // Business 테이블을 참조
                    key: 'business_registration_number',
                },
                onUpdate: 'CASCADE', // 외래 키 업데이트 정책
                onDelete: 'CASCADE', // 외래 키 삭제 정책
            },
            bank_code: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            account_holder: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            account_number: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: 'BUSINESS_ACCOUNT_NUMBER',
        }
    );

    BusinessAccountNumber.associate = (db) => {
        // 관계 설정이 필요한 경우 여기에 추가
    };

    return BusinessAccountNumber;
};
