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
    },
    {
      timestamps: true, 
      tableName: "master",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Master;
};
