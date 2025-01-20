module.exports = (sequelize, DataTypes) => {
    const BusinessBeautySignificant = sequelize.define('business_beauty_significant', { 
        business_beauty_significant_id: {
        type: DataTypes.INTEGER, // 숫자 타입으로 변경
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, // 자동 증가 설정
      },
      business_registration_number: {
        type: DataTypes.STRING(200),
        allowNull: false,
        references: {
          model: 'business', // Business 모델을 참조
          key: 'business_registration_number',
        },
        onUpdate: 'CASCADE', // 외래 키 업데이트 정책
        onDelete: 'CASCADE', // 외래 키 삭제 정책
      },
      business_beauty_significant1: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '피부병',
      },
      business_beauty_significant2: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '심장질환',
      },
      business_beauty_significant3: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '마킹',
      },
      business_beauty_significant4: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '마운팅',
      },
      business_beauty_significant5: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '슬개골 탈구',
      },
    }, {
      timestamps: false,
      tableName: 'business_beauty_significant',
    });
  
    // 관계 설정: Business 모델과 연관
      BusinessBeautySignificant.associate = (db) => {

      BusinessBeautySignificant.belongsTo(db.Business, {
      foreignKey: 'business_registration_number',
      targetKey: 'business_registration_number',
    });
  };

    return BusinessBeautySignificant;
  };
  