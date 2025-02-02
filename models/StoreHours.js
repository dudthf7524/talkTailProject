module.exports = (sequelize, DataTypes) => {
    const StoreHours = sequelize.define(
      'store_hours',
      {
        store_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        business_registration_number: {
          type: DataTypes.STRING(200),
          allowNull: false,
          references: {
            model: 'business', // BUSINESS 테이블을 참조
            key: 'business_registration_number',
          },
          onUpdate: 'CASCADE', // 외래 키 업데이트 정책
          onDelete: 'CASCADE', // 외래 키 삭제 정책
        },
        hours: {
          type: DataTypes.JSON, // JSON 형식으로 영업시간을 저장
          allowNull: false,
        },
      },
      {
        timestamps: false,
        tableName: 'store_hours',
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
  