module.exports = (sequelize, DataTypes) => {
    const Business = sequelize.define(
      'business',
      {
        business_registration_number: {
          type: DataTypes.STRING(200),
          allowNull: false,
          primaryKey: true,
        },
        business_registration_name: {
          type: DataTypes.STRING(30),
          allowNull: false,
          defaultValue: '',
        },
        category: {
          type: DataTypes.ENUM('beauty', 'food', 'shopping', 'kindergarten', 'hotel', 'etc'),
          allowNull: false,
        },
        login_id: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        login_password: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        business_owner_name: {
          type: DataTypes.STRING(20),
          allowNull: false,
          defaultValue: '',
        },
        business_owner_email: {
          type: DataTypes.STRING(20),
          allowNull: false,
          defaultValue: '',
        },
        business_owner_phone: {
          type: DataTypes.STRING(20),
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
        tableName: 'business',
      }
    );
  
    Business.associate = (db) => {
      // 관계 설정이 필요한 경우 여기에 추가
    };
  
    return Business;
  };
  