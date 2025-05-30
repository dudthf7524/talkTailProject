const { sequelize, BeautyNotice, BeautyReservation } = require("../models");
const { Pet } = require("../models")

const customerManagementGet = async (business_registration_number) => {

  // try {
  //     const results = await BeautyReservation.findAll({
  //       where: { 
  //         business_registration_number, 
  //         reservation_state : "완료",
  //       },

  //       attributes: ["beauty_reservation_id",],
  //       include: [
  //         {
  //           model: Pet,
  //           attributes: ["pet_name"], 
  //           required: true,
  //         },
  //       ],
  //       logging: console.log, 
  //     });

  //     console.log(results);
  //     return results;
  //   } catch (error) {
  //     console.error(error)
  //     throw new Error("Failed to fetch business details");
  //   }


  try {
    let sql = "";
    sql +=
      "select beauty_reservation_id, pet_name, user_name, date, start_time, end_time, beauty_notice_is_available, reservation_state ";
    sql += "from beauty_reservation br ";
    sql += "join pet pi ";
    sql += "on br.pet_id = pi.pet_id ";
    sql += "join user_information ui ";
    sql += "on br.platform_id = ui.platform_id ";
    sql += "where br.business_registration_number = :business_registration_number ";
    sql += "and (br.reservation_state ='완료' or br.reservation_state ='픽업완료') ";

    const [results, metadata] = await sequelize.query(
      sql,

      {
        replacements: { business_registration_number }, // 바인딩 파라미터
        type: sequelize.QueryTypes.SELECTALL, // 쿼리 유형
        logging: console.log, // 이 쿼리에 대한 SQL 로그만 출력
      }
    );
    return results;
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to register pet: ${error.message}`);
  }
};

const customerNoticeWrite = async (id, data) => {

  const style = data.formData;
  const selectedOptions = data.selectedOptions;
  const selectedMultipleOptions = data.selectedMultipleOptions;

  try {
    const BeautyNoticeData = await BeautyNotice.create({
      beauty_reservation_id: id,
      notice_style: style.notice_style,
      notice_pet_weight: style.notice_pet_weight,
      notice_skin: selectedMultipleOptions.notice_skin,
      notice_ear: selectedMultipleOptions.notice_ear,
      notice_eye: selectedMultipleOptions.notice_eye,
      notice_sole: selectedMultipleOptions.notice_sole,
      notice_claw: selectedMultipleOptions.notice_claw,
      notice_analSac: selectedOptions.notice_analSac,
      notice_hairTangling: style.notice_hairTangling,
      notice_etc: style.notice_etc,
    });
    return BeautyNoticeData;
  } catch (error) {
    console.error(error)
    throw new Error("Failed to create customerNoticeWrite", error.message);
  }
};

const customerNoticeTrue = async (id) => {
  console.log("업데이트 문장이다");
  console.log(id);
  try {
    const BeautyReservationData = await BeautyReservation.update(
      {
        beauty_notice_is_available: true,
      },
      {
        where: { beauty_reservation_id: id },
      }
    );
    return BeautyReservationData;
  } catch (error) {
    console.error(error)
    throw new Error("Failed to update BeautyReservationData: " + error.message);
  }
};

const customerNoticeList = async (platform_id) => {
  console.log(platform_id);
  try {
    let sql = "";
    sql +=
      "select beauty_notice_id, date, business_name, address_road, address_detail ";
    sql += "from beauty_reservation br ";
    sql += "join beauty_notice bn ";
    sql += "on br.beauty_reservation_id = bn.beauty_reservation_id ";
    sql += "join business_information bi ";
    sql +=
      "on br.business_registration_number= bi.business_registration_number ";
    sql += "where br.platform_id = :platform_id ";

    const [results, metadata] = await sequelize.query(
      sql,

      {
        replacements: { platform_id }, // 바인딩 파라미터
        type: sequelize.QueryTypes.SELECTALL, // 쿼리 유형
        logging: console.log, // 이 쿼리에 대한 SQL 로그만 출력
      }
    );

    return results;
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to register pet: ${error.message}`);
  }
};

const customerBusinessNoticeDetail = async (id) => {

  try {
    let sql = "";
    sql +=
      "select notice_style, notice_pet_weight, notice_skin, notice_ear, notice_eye, notice_sole, notice_claw ,notice_analSac, notice_hairTangling, notice_etc, pet_name, pet_breed, pet_birth, pet_weight ";
    sql += "from beauty_notice bn ";
    sql += "join beauty_reservation br ";
    sql += "on bn.beauty_reservation_id = br.beauty_reservation_id ";
    sql += "join pet p  ";
    sql += "on br.pet_id = p.pet_id ";
    sql += "where bn.beauty_reservation_id = :id ";

    const [results, metadata] = await sequelize.query(
      sql,

      {
        replacements: { id }, // 바인딩 파라미터
        type: sequelize.QueryTypes.SELECT, // 쿼리 유형
        logging: console.log, // 이 쿼리에 대한 SQL 로그만 출력
      }
    );
    return results;
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to register pet: ${error.message}`);
  }
};

const customerNoticeDetail = async (id) => {

  try {
    let sql = "";
    sql +=
      "select beauty_notice_id, notice_style, notice_pet_weight, notice_skin, notice_ear, notice_eye, notice_sole, notice_claw ,notice_analSac, notice_hairTangling, notice_etc, pet_name, pet_breed, pet_birth, pet_weight ";
    sql += "from beauty_notice bn ";
    sql += "join beauty_reservation br ";
    sql += "on bn.beauty_reservation_id = br.beauty_reservation_id ";
    sql += "join pet p  ";
    sql += "on br.pet_id = p.pet_id ";
    sql += "where bn.beauty_notice_id = :id ";

    const [results, metadata] = await sequelize.query(
      sql,

      {
        replacements: { id }, // 바인딩 파라미터
        type: sequelize.QueryTypes.SELECT, // 쿼리 유형
        logging: console.log, // 이 쿼리에 대한 SQL 로그만 출력
      }
    );
    return results;
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to register pet: ${error.message}`);
  }
};

module.exports = {
  customerManagementGet,
  customerNoticeWrite,
  customerNoticeTrue,
  customerNoticeList,
  customerBusinessNoticeDetail,
  customerNoticeDetail,

};
