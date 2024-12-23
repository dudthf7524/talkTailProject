const { sequelize } = require('../models');

const customerManagementGet = async (business_registration_number) => {
    try {
      
        let sql = "";
        sql += "select beauty_reservation_id, pet_name, user_name, reservationDesiredTime, reservationCompleteTime, beauty_notice_is_avaiable ";
        sql += "from beauty_reservations br ";
        sql += "join tb_pets pi ";
        sql += "on br.pet_id = pi.pet_id ";
        sql += "join user_infos ui ";
        sql += "on br.platform_id = ui.platform_id ";
        sql += "where br.business_registration_number = :business_registration_number ";
     

        const [results, metadata] = await sequelize.query(
            sql,

            {
                replacements: { business_registration_number: business_registration_number }, // 바인딩 파라미터
                type: sequelize.QueryTypes.SELECT, // 쿼리 유형
                logging: console.log, // 이 쿼리에 대한 SQL 로그만 출력
            }

        );
        console.log(metadata);
        console.log(results);
        return [results];

    } catch (error) {
        throw new Error(`Failed to register pet: ${error.message}`);
    }
};

const customerNoticeWrite = async (id, data) => {

    console.log(id)
    console.log(data)

    // try {
      
    //     let sql = "";
    //     sql += "select beauty_reservation_id, pet_name, user_name, reservationDesiredTime, reservationCompleteTime, beauty_notice_is_avaiable ";
    //     sql += "from beauty_reservations br ";
    //     sql += "join tb_pets pi ";
    //     sql += "on br.pet_id = pi.pet_id ";
    //     sql += "join user_infos ui ";
    //     sql += "on br.platform_id = ui.platform_id ";
    //     sql += "where br.business_registration_number = :business_registration_number ";
     

    //     const [results, metadata] = await sequelize.query(
    //         sql,

    //         {
    //             replacements: { business_registration_number: business_registration_number }, // 바인딩 파라미터
    //             type: sequelize.QueryTypes.SELECT, // 쿼리 유형
    //             logging: console.log, // 이 쿼리에 대한 SQL 로그만 출력
    //         }

    //     );
    //     console.log(metadata);
    //     console.log(results);
    //     return [results];

    // } catch (error) {
    //     throw new Error(`Failed to register pet: ${error.message}`);
    // }
};



module.exports = {
    
    customerManagementGet,
    customerNoticeWrite,

};