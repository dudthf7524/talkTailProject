module.exports = (sequelize, DataTypes) => {
  const BeautyReservation = sequelize.define(
    'BEAUTY_RESERVATION',
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
      depositAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reservationDesiredTime: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      reservationApplicationTime: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      reservationCompleteTime: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: '',
      },
      beauty_reservation_is_avaiable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      beauty_notice_is_avaiable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    },
    {
      timestamps: false,
    }
  );

  BeautyReservation.associate = (db) => {
    // 관계 설정이 필요한 경우 여기에 추가
  };

  return BeautyReservation;
};