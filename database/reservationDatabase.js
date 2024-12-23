
const { BeautyReservation, sequelize } = require('../models');
const dayjs = require("dayjs");
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
        sql += "select business_desinger_name, user_phone, pet_name, pet_species, pet_breed, pet_birth, pet_weight, pet_gender, pet_neuter, beauty_style, beauty_significant, beauty_caution, reservationCompleteTime, beauty_reservation_is_avaiable ";
        sql += "from beauty_reservations br ";
        sql += "join user_infos ui ";
        sql += "on br.platform_id = ui.platform_id ";
        sql += "join tb_pets tp ";
        sql += "on br.pet_id = tp.pet_id ";
        sql += "join tb_businesses_desingers tbd ";
        sql += "on br.business_desinger_id = tbd.business_desinger_id ";
        sql += "where br.beauty_reservation_id = :id ";

        const [results, metadata] = await sequelize.query(
            sql,

            {
                replacements: { id: id }, // 바인딩 파라미터
                type: sequelize.QueryTypes.SELECT, // 쿼리 유형
                logging: console.log, // 이 쿼리에 대한 SQL 로그만 출력
            }

        );
        console.log(metadata);
        console.log(results.pet_birth);

        // 나이 계산 함수 (dayjs 사용)
        const calculateAge = (birthDate, referenceDate = dayjs()) => {
            const birth = dayjs(birthDate);
            const yearsDiff = referenceDate.diff(birth, "year"); // 연도 차이 계산
            const adjustedReference = birth.add(yearsDiff, "year");

            // 생일이 지나지 않았다면 나이를 하나 감소
            return referenceDate.isBefore(adjustedReference) ? yearsDiff - 1 : yearsDiff;
        };
        const age = calculateAge(results.pet_birth);

        results.pet_birth = age;

        return results

    } catch (error) {
        throw new Error(`Failed to register pet: ${error.message}`);
    }
};

const setCompleteTime = async (id, reservationComplete) => {

    console.log(id)
    console.log(reservationComplete)
    const currentDate = dayjs().format('YYYY-MM-DD');
    console.log(currentDate);

    const reservationCompleteTime = currentDate + " " + reservationComplete;
    
    console.log(reservationCompleteTime)

      try {
        const setCompleteTimeUpdate = await BeautyReservation.update(
          { 
             beauty_reservation_is_avaiable: true,
             reservationCompleteTime: reservationCompleteTime
          },
          {
             where: { beauty_reservation_id: id }, 
          }
        );
      } catch (error) {
        console.error('Failed to fetch authority request error: ', error);
        res.status(500).json({ message: 'Failed to fetch authority request.' });
      }
}

module.exports = {
    beautyReservation,
    beautyReservationGet,
    beautyReservationDetail,
    setCompleteTime,
};
