module.exports = (sequelize, DataTypes) => {
    const BankInformation = sequelize.define(
        'bank_information',
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
            tableName: 'bank_information',
        }
    );

    BankInformation.associate = (models) => {
        BankInformation.hasMany(models.BusinessAccountNumber, {
            foreignKey: "bank_code",
            sourceKey: "code",
          });
    };

    return BankInformation;
};
