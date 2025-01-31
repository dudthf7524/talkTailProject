module.exports = (sequelize, DataTypes) => {
    const DesingerCloseDay = sequelize.define('desinger_close_day', {
        desinger_close_day_id: {
            type: DataTypes.INTEGER, // 숫자 타입으로 변경
            allowNull: false,
            primaryKey: true,
            autoIncrement: true, // 자동 증가 설정
        },
        business_desinger_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'business_desinger', // Business 테이블을 참조
                key: 'business_desinger_id',
            },
            onUpdate: 'CASCADE', // 외래 키 업데이트 정책
            onDelete: 'CASCADE', // 외래 키 삭제 정책
        },
        desinger_close_day: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
       
    }, {
        timestamps: false,
        tableName: 'desinger_close_day',
    });

    DesingerCloseDay.associate = (db) => {

        DesingerCloseDay.belongsTo(db.BusinessDesinger, {
            foreignKey: 'business_desinger_id',
            targetKey: 'business_desinger_id',
        });
    };

    return DesingerCloseDay;
};
