module.exports = (sequelize, DataTypes) => {
    const UserAuthorityRequest = sequelize.define(
        'user_authority_request',
        {
            user_authority_request_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            business_registration_number: {
                type: DataTypes.STRING(200),
                allowNull: false,
                references: {
                    model: 'business',
                    key: 'business_registration_number',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            platform_id: {
                type: DataTypes.STRING(200),
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'platform_id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            authority_is_available: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            authority_state: {
                type: DataTypes.STRING(10),
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
        },
        {
            tableName: 'user_authority_request',
            timestamps: false,
        }
    );

    UserAuthorityRequest.associate = (db) => {
        db.UserAuthorityRequest.belongsTo(db.User, { foreignKey: 'platform_id', targetKey: 'platform_id' });
        db.UserAuthorityRequest.belongsTo(db.Business, { foreignKey: 'business_registration_number', targetKey: 'business_registration_number' });
    };

    return UserAuthorityRequest;
};
