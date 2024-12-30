module.exports = (sequelize, DataTypes) => {
    const UserInformation = sequelize.define(
      'USER_INFORMATION',
      {
        user_information_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        platform_id: {
          type: DataTypes.STRING(200),
          allowNull: false,
          unique: true,
          references: {
            model: 'USER',
            key: 'platform_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
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
      },
      {
        timestamps: false,
        tableName: 'USER_INFORMATION',
      }
    );
  
    UserInformation.associate = (db) => {
      db.UserInformation.belongsTo(db.User, { foreignKey: 'platform_id', targetKey: 'platform_id' });
      db.UserInformation.hasMany(db.UserAuthorityRequest, { foreignKey: 'platform_id', sourceKey: 'platform_id' });
    };
  
    return UserInformation;
  };
  