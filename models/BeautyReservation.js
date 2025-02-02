module.exports = (sequelize, DataTypes) => {
  const BeautyReservation = sequelize.define(
    'beauty_reservation',
    {
      beauty_reservation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      business_registration_number: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      platform_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      pet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      business_desinger_id: {
        type: DataTypes.INTEGER, // 숫자 타입으로 변경
        allowNull: false,
      },
      beauty_style: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      beauty_significant: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      beauty_caution: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      beauty_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      paid_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reservation_applicationTime: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: '',
      },
      start_time: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: '',
      },
      end_time: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: '',
      },
      // beauty_reservation_is_avaiable: {
      //   type: DataTypes.BOOLEAN,
      //   allowNull: false,
      //   defaultValue: false,
      // },
      beauty_notice_is_available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      reservation_state: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: '',
      },
      reject_content: {
        type: DataTypes.STRING(200),
        allowNull: false,
        defaultValue: '',
      },
      
    },
    {
      timestamps: false,
      tableName: 'beauty_reservation',
    }
  );

  BeautyReservation.associate = (db) => {
    // 관계 설정이 필요한 경우 여기에 추가
  };

  return BeautyReservation;
};
