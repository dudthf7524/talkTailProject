module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'TB_USERS',
    {
      platform_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      platform: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '',
      },
      user_nickname: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '',
      },
      user_email: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      user_phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        defaultValue: '',
      },
      user_address: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: '',
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
      indexes: [
        {
          unique: true,
          fields: ['platform_id', 'platform'],
        },
      ],
    }
  );

  User.associate = (db) => {
    db.User.hasMany(db.UserInfo, { foreignKey: 'platform_id', sourceKey: 'platform_id' });
    db.User.hasMany(db.UserAuthorityRequest, { foreignKey: 'platform_id', sourceKey: 'platform_id' });
  };

  return User;
};
