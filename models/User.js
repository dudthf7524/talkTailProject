module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      platform_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      platform: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        onUpdate: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      timestamps: false,
      tableName: 'user',
      indexes: [
        {
          unique: true,
          fields: ['platform_id', 'platform'],
        },
      ],
    }
  );

  User.associate = (db) => {
    db.User.hasMany(db.UserInformation, { foreignKey: 'platform_id', sourceKey: 'platform_id' });
    db.User.hasMany(db.UserAuthorityRequest, { foreignKey: 'platform_id', sourceKey: 'platform_id' });
  };

  return User;
};
