
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
            deposit_amount: beautyReservationData.depositAmount,
            reservation_applicationTime: beautyReservationData.reservationApplicationTime,
            date: beautyReservationData.date,
            start_time: beautyReservationData.startTime,
            end_time: beautyReservationData.startTime,
            reservation_state : '대기'
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
            where: {
                business_registration_number: business_registration_number,
            },
        });
        console.log(BeautyReservationData)
        return BeautyReservationData;

    } catch (error) {
        throw new Error(`Failed to register pet: ${error.message}`);
    }
};
const beautyReservationDetail = async (id) => {
    console.log(id)
    try {
        let sql = "";
        sql += "select business_name, business_phone, start_time, end_time, business_desinger_name, user_phone, pet_name, pet_species, pet_breed, pet_birth, pet_weight, pet_gender, pet_neuter, beauty_style, beauty_significant, beauty_caution, end_time, beauty_reservation_is_avaiable, reservation_state, reject_content ";
        sql += "from beauty_reservation br ";
        sql += "join user_information ui ";
        sql += "on br.platform_id = ui.platform_id ";
        sql += "join pet tp ";
        sql += "on br.pet_id = tp.pet_id ";
        sql += "join business_desinger tbd ";
        sql += "on br.business_desinger_id = tbd.business_desinger_id ";
        sql += "join business_information bi ";
        sql += "on tbd.business_registration_number = bi.business_registration_number ";
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
        throw new Error(`Failed to beautyReservationDetail: ${error.message}`);
    }
};

const setCompleteTime = async (id, reservationComplete) => {


    console.log(reservationComplete)

    try {
        const setCompleteTimeUpdate = await BeautyReservation.update(
            {
                reservation_state : "완료",
                end_time: reservationComplete
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

const beautyReservationDesinger = async (designerId) => {

    console.log(designerId)

    try {
        const beautyReservationDesingerData = await BeautyReservation.findAll(
            {
                where: { business_desinger_id: designerId },
                attributes: ['date', 'start_time', 'end_time'],

            }
        );
        console.log(beautyReservationDesingerData)
        return beautyReservationDesingerData
    } catch (error) {
        console.error('Failed to fetch authority request error: ', error);
        res.status(500).json({ message: 'Failed to fetch authority request.' });
    }


}
const beautyReservationReject = async (beauty_reservation_id, reject_content) => {

    console.log(beauty_reservation_id)
    console.log(reject_content)

    try {
        const result = await BeautyReservation.update(
            {
                reservation_state : "거절",
                reject_content: reject_content,
            },
            {
                where: { beauty_reservation_id: beauty_reservation_id },
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
    beautyReservationDesinger,
    beautyReservationReject
};
