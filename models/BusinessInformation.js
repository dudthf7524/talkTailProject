module.exports = (sequelize, DataTypes) => {
    const BusinessInformation = sequelize.define('TB_BUSINESSES_INFORMATION', {
      business_information_id: {
        type: DataTypes.INTEGER, // 숫자 타입으로 변경
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, // 자동 증가 설정
      },
      business_registration_number: {
        type: DataTypes.STRING(200),
        allowNull: false,
        defaultValue: '',
        references: {
          model: 'TB_BUSINESSES', // Business 테이블을 참조
          key: 'business_registration_number',
        },
        onUpdate: 'CASCADE', // 외래 키 업데이트 정책
        onDelete: 'CASCADE', // 외래 키 삭제 정책
      },
      business_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      business_main_image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
      },
      business_price_image1: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
      },
      business_price_image2: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
      },
      business_price_image3: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
      },
      address_postcode: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: '',
      },
      address_road: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: '',
      },
      address_jibun: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: '',
      },
      address_detail: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: '',
      },
      weekday_open_time: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '00:00:00',
      },
      weekday_close_time: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '00:00:00',
      },
      weekend_open_time: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '00:00:00',
      },
      weekend_close_time: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '00:00:00',
      },
      dayon: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '',
      },
      dayoff: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '',
      },
      business_phone1: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      business_phone2: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      business_phone3: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      business_comment: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: '',
      },
      business_no_show: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
    });
  
    // 관계 설정: Business 모델과 연관
    BusinessInformation.belongsTo(sequelize.models.TB_BUSINESSES, { foreignKey: 'business_registration_number', targetKey: 'business_registration_number' });
  
    return BusinessInformation;
  };
  