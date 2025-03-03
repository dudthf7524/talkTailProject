module.exports = (sequelize, DataTypes) => {
    const BeautyNotice = sequelize.define(
        'beauty_notice',
        {
            beauty_notice_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            beauty_reservation_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
            },
            notice_style: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            notice_pet_weight: {
                type: DataTypes.FLOAT,
                allowNull: false,
                defaultValue: 0.0,
            },
            notice_skin: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            notice_ear: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            notice_eye: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            notice_sole: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            notice_claw: {
                type: DataTypes.STRING(30),
                allowNull: false,
                defaultValue: '',
            },
            notice_analSac: {
                type: DataTypes.STRING(30),
                allowNull: false,
                defaultValue: '',
            },
            notice_hairTangling: {
                type: DataTypes.STRING(30),
                allowNull: false,
                defaultValue: '',
            },
            notice_etc: {
                type: DataTypes.STRING(100),
                allowNull: false,
                defaultValue: '',
            },


        },
        {
            timestamps: false,
            tableName: 'beauty_notice',
        }
    );

    BeautyNotice.associate = (db) => {
        // 관계 설정이 필요한 경우 여기에 추가
    };

    return BeautyNotice;
};
