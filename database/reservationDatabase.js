
const { BeautyReservation, sequelize } = require('../models');
// 사용자 생성 또는 조회 함수

const beautyReservation = async (beautyReservationData) => {
    console.log("미용예약 데이터베이스")
    console.log(beautyReservationData)
    try {
        const BeautyReservationData = await BeautyReservation.create({
            business_registration_number: beautyReservationData.business_registration_number,
            platform_id: beautyReservationData.platform_id,
            pet_id: beautyReservationData.pet_id,
            business_desinger_id: beautyReservationData.business_desinger_id,
            beauty_style: beautyReservationData.beauty_style,
            beauty_significant: beautyReservationData.beauty_significant,
            beauty_caution: beautyReservationData.beauty_caution,
            depositAmount: beautyReservationData.depositAmount,
            reservationDesiredTime: beautyReservationData.reservationDesiredTime,
            reservationApplicationTime: beautyReservationData.reservationApplicationTime,
        });
        return BeautyReservationData;
    } catch (error) {
        throw new Error(`Failed to register pet: ${error.message}`);
    }
};

const beautyReservationGet = async (business_registration_number) => {
    console.log("미용예약 데이터베이스")
    console.log(business_registration_number)
    try {
        const BeautyReservationData = await BeautyReservation.findAll({
            business_registration_number: business_registration_number,

        });
        console.log(BeautyReservationData)
        return BeautyReservationData;
        
    } catch (error) {
        throw new Error(`Failed to register pet: ${error.message}`);
    }
};
const beautyReservationDetail = async (id) => {
    try {
       

        let sql = "";
        sql+="select business_desinger_name, user_phone, pet_name, pet_species, pet_breed, pet_birth, pet_weight, pet_gender, pet_neuter, beauty_style, beauty_significant, beauty_caution ";
        sql+="from beauty_reservations br ";
        sql+="join user_infos ui ";
        sql+="on br.platform_id = ui.platform_id ";
        sql+="join tb_pets tp ";
        sql+="on br.pet_id = tp.pet_id ";
        sql+="join tb_businesses_desingers tbd ";
        sql+="on br.business_desinger_id = tbd.business_desinger_id ";
        sql+="where br.beauty_reservation_id = :id ";
        console.log(sql)
         const [results, metadata] = await sequelize.query(
            sql,

            {
                replacements: { id: id }, // 바인딩 파라미터
                type: sequelize.QueryTypes.SELECT, // 쿼리 유형
                logging: console.log, // 이 쿼리에 대한 SQL 로그만 출력
            }

        );
        console.log(metadata);
        console.log(results);
        return results
        
    } catch (error) {
        throw new Error(`Failed to register pet: ${error.message}`);
    }
};

module.exports = {
    beautyReservation,
    beautyReservationGet,
    beautyReservationDetail,
};
