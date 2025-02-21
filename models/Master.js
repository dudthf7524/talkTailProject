module.exports = (sequelize, DataTypes) => {
  const Master = sequelize.define(
    "master",
    {
      login_id: {
        type: DataTypes.STRING(20),
        allowNull: false,
        primaryKey: true,
      },
      login_password: {
        type: DataTypes.STRING(100),
        allowNull: false,
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
      tableName: "master",
    }
  );

  Master.associate = (db) => {
    // 관계 설정이 필요한 경우 여기에 추가
  };

  return Master;
};
