const { sequelize, BeautyNotice, BeautyReservation } = require('../models');

const customerManagementGet = async (business_registration_number) => {
    try {

        let sql = "";
        sql += "select beauty_reservation_id, pet_name, user_name, date, start_time, end_time, beauty_notice_is_available ";
        sql += "from beauty_reservation br ";
        sql += "join pet pi ";
        sql += "on br.pet_id = pi.pet_id ";
        sql += "join user_information ui ";
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

    const style = data.formData
    console.log(style)
    const selectedOptions = data.selectedOptions
    console.log(selectedOptions)

    try {
           const BeautyNoticeData = await BeautyNotice.create({
               beauty_reservation_id: id,
               notice_style: style.notice_style,
               notice_skin: selectedOptions.notice_skin,
               notice_ear: selectedOptions.notice_ear,
               notice_eye: selectedOptions.notice_eye,
               notice_sole: selectedOptions.notice_sole,
               notice_claw: selectedOptions.notice_claw,
               notice_analSac: selectedOptions.notice_analSac,
               notice_hairTangling: selectedOptions.notice_hairTangling,
               notice_etc: style.notice_etc,
           });

           return BeautyNoticeData;
       } catch (error) {
           throw new Error('Failed to create customerNoticeWrite', error.message);
       }
};

const customerNoticeTrue = async (id) => {
    console.log("업데이트 문장이다")
    console.log(id)
    try {
            const BeautyReservationData = await BeautyReservation.update(
                {
                    beauty_notice_is_available: true,
                },
                {
                    where: { beauty_reservation_id: id }
                }

            );
            return BeautyReservationData;
        } catch (error) {
            // 오류를 더욱 상세하게 로깅
            
            throw new Error('Failed to update BeautyReservationData: ' + error.message);
        }
};



module.exports = {

    customerManagementGet,
    customerNoticeWrite,
    customerNoticeTrue,

};