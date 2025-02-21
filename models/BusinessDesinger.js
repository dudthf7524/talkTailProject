module.exports = (sequelize, DataTypes) => {
    const BusinessDesinger = sequelize.define('business_desinger', {
      business_desinger_id: {
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
      business_desinger_profile: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
      },
      business_desinger_name: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: '',
      },
      business_desinger_grade: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: '',
      },
      business_desinger_introduce: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: '',
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
    }, {
      timestamps: false,
      tableName: 'business_desinger',
    });
  
    // 관계 설정: Business 모델과 연관
    BusinessDesinger.associate = (db) => {

      BusinessDesinger.belongsTo(db.Business, {
      foreignKey: 'business_registration_number',
      targetKey: 'business_registration_number',
    });
  };
    return BusinessDesinger;
  };
  