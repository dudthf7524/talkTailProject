module.exports = (sequelize, DataTypes) => {
    const StoreHours = sequelize.define(
      'STORE_HOURS',
      {
        store_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        business_registration_number: {
          type: DataTypes.STRING(30),
          allowNull: false,
          references: {
            model: 'BUSINESS', // BUSINESS 테이블을 참조
            key: 'business_registration_number',
          },
        },
        hours: {
          type: DataTypes.JSONB, // JSON 형식으로 영업시간을 저장
          allowNull: false,
        },
      },
      {
        timestamps: false,
        tableName: 'STORE_HOURS',
      }
    );
  
    StoreHours.associate = (db) => {
      // 비즈니스와 store_hours 관계 설정
      StoreHours.belongsTo(db.Business, {
        foreignKey: 'business_registration_number',
        targetKey: 'business_registration_number',
      });
    };
  
    return StoreHours;
  };
  