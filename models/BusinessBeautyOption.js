module.exports = (sequelize, DataTypes) => {
    const BusinessBeautyOption = sequelize.define('business_beauty_option', { 
        business_beauty_option_id: {
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
      business_beauty_option1: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '소형견',
      },
      business_beauty_option2: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '대형견',
      },
      business_beauty_option3: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'CCTV',
      },
      business_beauty_option4: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '주차장',
      },
      business_beauty_option5: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '샤워장',
      },

    }, {
      timestamps: false,
      tableName: 'business_beauty_option',
    });
    
    // 관계 설정: Business 모델과 연관    
    BusinessBeautyOption.associate = (db) => {

      BusinessBeautyOption.belongsTo(db.Business, {
      foreignKey: 'business_registration_number',
      targetKey: 'business_registration_number',
    });
  };

    return BusinessBeautyOption;
};
  