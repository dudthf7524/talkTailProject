module.exports = (sequelize, DataTypes) => {
    const BankInformation = sequelize.define(
        'BANK_INFORMATION',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            code: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },
        {
            timestamps: false,
            tableName: 'BANK_INFORMATION',
        }
    );

    BankInformation.associate = (db) => {
        // 관계 설정이 필요한 경우 여기에 추가
    };

    return BankInformation;
};
