// 새로운 업체를 생성하는 함수

const bcrypt = require("bcrypt");

const { BusinessInformation, sequelize } = require("../models");
const { BusinessDesinger } = require("../models");
const { Business } = require("../models");
const { BusinessBeautySignificant } = require("../models");
const { BusinessBeautyOption } = require("../models");
const { BusinessAccountNumber } = require("../models");
const { StoreHours } = require("../models");
const { BankInformation } = require("../models");


const createBusiness = async (businessInfo) => {
  const business_owner_phone =
    businessInfo.business_owner_phone1 +
    "-" +
    businessInfo.business_owner_phone2 +
    "-" +
    businessInfo.business_owner_phone3;
  try {
    const business = await Business.create({
      business_registration_number: businessInfo.business_registration_number,
      business_registration_name: businessInfo.business_registration_name,
      category: businessInfo.category,
      login_id: businessInfo.login_id,
      login_password: businessInfo.login_password,
      business_owner_name: businessInfo.business_owner_name,
      business_owner_email: businessInfo.business_owner_email,
      business_owner_phone: business_owner_phone,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return business;
  } catch (error) {
    console.error(error)
    throw new Error("Failed to create business", error.message);
  }
};

const createBusinessInformation = async (businessInformationInfo) => {
  
  const business_phone =
    businessInformationInfo.business_phone1 +
    "-" +
    businessInformationInfo.business_phone2 +
    "-" +
    businessInformationInfo.business_phone3;
  const t = await sequelize.transaction(); // 트랜잭션 시작

  try {
    // 1. 사업자 정보 저장
    const businessInformation = await BusinessInformation.create(
      {
        business_registration_number:
        businessInformationInfo.business_registration_number,
        business_main_image: businessInformationInfo.business_main_image,
        business_price_image1: businessInformationInfo.business_price_image1,
        business_price_image2: businessInformationInfo.business_price_image2,
        business_price_image3: businessInformationInfo.business_price_image3,
        business_name: businessInformationInfo.business_name,
        address_postcode: businessInformationInfo.address_postcode,
        address_road: businessInformationInfo.address_road,
        address_jibun: businessInformationInfo.address_jibun,
        address_detail: businessInformationInfo.address_detail,
        business_phone: business_phone,
        business_comment: businessInformationInfo.business_comment,
        business_no_show: businessInformationInfo.business_no_show,
        created_at: new Date(),
        updated_at: new Date(),
      },
      { transaction: t }
    );

    // 2. 사업자 특이사항 저장 (디폴트 값 저장)
    const beautySignificant = await BusinessBeautySignificant.create(
      {
        business_registration_number:
          businessInformationInfo.business_registration_number,
      },
      { transaction: t }
    );

    // 3. 사업자 옵션 저장 (디폴트 값 저장)
    const beautyOption = await BusinessBeautyOption.create(
      {
        business_registration_number:
          businessInformationInfo.business_registration_number,
      },
      { transaction: t }
    );

    // 커밋하여 모든 작업을 완료
    await t.commit();

    // 두 개의 데이터를 객체로 묶어서 반환
    return {
      businessInformation,
      beautySignificant,
      beautyOption,
    };
  } catch (error) {
    console.error(error)
    // 오류 발생 시 롤백
    await t.rollback();
    throw new Error(
      "Failed to create business information and beauty significant.",
      error.message
    );
  }
};

const createBusinessDesinger = async (businessInfo) => {
  
  try {
    const business = await BusinessDesinger.create({
      business_registration_number: businessInfo.business_registration_number,
      business_desinger_introduce: businessInfo.business_desinger_introduce,
      business_desinger_name: businessInfo.business_desinger_name,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return business;
  } catch (error) {
    console.log(error)
    throw new Error("Failed to create business", error.message);
  }
};

const businessLogin = async (login_id, login_password) => {
  try {
    const business = await Business.findOne({
      where: { login_id: login_id }, 
    });

    if (!business) {
     
      return null;
    }
    // bcrypt를 사용하여 비밀번호 비교
    const isPasswordValid = await bcrypt.compare(
      login_password,
      business.login_password
    );

    if (!isPasswordValid) {
      return null; // 비밀번호 불일치하면 null 반환
    }

    // 사업자가 존재하면 해당 사업자 객체 반환
    return business;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch business data");
  }
};

const checkLogin = async (login_id) => {
  try {
    // business 테이블에서 login_id (business_id)에 해당하는 사업자 정보 조회
    const business = await Business.findOne({
      where: { login_id: login_id }, // login_id는 business_id에 해당
    });

    if (business) {
      return "1";
    }

    if (!business) {
      // 해당 사업자가 존재하지 않으면 null 반환
      return "0";
    }
    console.log(business);
    // 사업자가 존재하면 해당 사업자 객체 반환
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch business data");
  }
};

const getBusinesses = async () => {
  try {
    // // 비즈니스 데이터 가져오기
    // const businessesInformation = await BusinessInformation.findAll({
    //     //where: { category },
    //     //attributes: ['id', 'name', 'location'],
    // });
    // return businessesInformation;
    let sql = "";
    sql +=
      "select business_information_id, b.business_registration_number, business_name, business_main_image, business_owner_phone, address_road, address_jibun, address_detail, business_beauty_option1 ,business_beauty_option2 ,business_beauty_option3 ,business_beauty_option4 ,business_beauty_option5 ";
    sql += "from business_information bi ";
    sql += "join business b ";
    sql +=
      "on bi.business_registration_number = b.business_registration_number ";
    sql += "join business_beauty_option bdo ";
    sql +=
      "on bi.business_registration_number = bdo.business_registration_number ";

    const [results, metadata] = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECTALL, // 쿼리 유형
      logging: console.log, // 이 쿼리에 대한 SQL 로그만 출력
    });
    console.log(metadata);
    console.log(results);
    return results;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch businesses with details");
  }
};

const getBusinessDetailsById = async (id) => {
  console.log(id);
  console.log("aaa");

  try {
    let sql = "";
    sql +=
      "select bi.business_registration_number, business_name, business_main_image, business_price_image1, business_price_image2, business_price_image3, business_comment, business_no_show, business_phone, hours ";
    sql += "from business_information bi ";
    sql += "join store_hours sh ";
    sql +=
      "on bi.business_registration_number = sh.business_registration_number ";
    sql += "where bi.business_information_id = :id ";

    const [results, metadata] = await sequelize.query(sql, {
      replacements: { id: id }, // 바인딩 파라미터
      type: sequelize.QueryTypes.SELECT, // 쿼리 유형
      logging: console.log, // 이 쿼리에 대한 SQL 로그만 출력
    });
    console.log(metadata);
    console.log(results);
    return results;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch business details");
  }
};

const updateBusinessBeautySignificant = async (RegisterBeautySignificant) => {
  console.log(RegisterBeautySignificant);

  try {
    const BeautySignificant = await BusinessBeautySignificant.update(
      {
        business_beauty_significant1:
          RegisterBeautySignificant.business_beauty_significant1,
        business_beauty_significant2:
          RegisterBeautySignificant.business_beauty_significant2,
        business_beauty_significant3:
          RegisterBeautySignificant.business_beauty_significant3,
        business_beauty_significant4:
          RegisterBeautySignificant.business_beauty_significant4,
        business_beauty_significant5:
          RegisterBeautySignificant.business_beauty_significant5,
      },
      {
        where: {
          business_registration_number:
            RegisterBeautySignificant.business_registration_number,
        },
      }
    );
    return BeautySignificant;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Failed to create RegisterBeautySignificant: " + error.message
    );
  }
};

const accountNumberGet = async (business_registration_number) => {
  try {
    let sql = "";
    sql +=
      "select business_beauty_significant1 , business_beauty_significant2, business_beauty_significant3 ,business_beauty_significant4 ,business_beauty_significant5 , business_owner_phone, name, account_holder, account_number ";
    sql += "from business_beauty_significant bbs ";
    sql += "join business b ";
    sql +=
      "on bbs.business_registration_number = b.business_registration_number ";
    sql += "join business_account_number bau ";
    sql +=
      "on bbs.business_registration_number = bau.business_registration_number ";
    sql += "join bank_information bi ";
    sql += "on bau.bank_code = bi.code ";
    sql +=
      "where b.business_registration_number = :business_registration_number ";

    const [results, metadata] = await sequelize.query(sql, {
      replacements: {
        business_registration_number: business_registration_number,
      }, // 바인딩 파라미터
      type: sequelize.QueryTypes.SELECT, // 쿼리 유형
      logging: console.log, // 이 쿼리에 대한 SQL 로그만 출력
    });

    console.log(results);
    return results;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Failed to create RegisterBeautySignificant: " + error.message
    );
  }
};

const getDateEdit = async (business_registration_number) => {
  try {
    let sql = "";
    sql += "select * from store_hours ";
    sql +=
      "where business_registration_number = :business_registration_number ";

    const [results, metadata] = await sequelize.query(sql, {
      replacements: {
        business_registration_number: business_registration_number,
      }, // 바인딩 파라미터
      type: sequelize.QueryTypes.SELECT, // 쿼리 유형
      logging: console.log, // 이 쿼리에 대한 SQL 로그만 출력
    });
    return results;
  } catch (error) {
    console.error(error)
    throw new Error("Failed to create RegisterBeautySignificant: " + error.message);
  }
};

const dateRegister = async (business_registration_number, dateRegisterData) => {
  console.log("aaaaaaaaaaaaaaaa");
  console.log(business_registration_number);
  console.log(dateRegisterData.hours);
  console.log("aaaaaaaaaaaaaaaa");

  const storeHoursData = {
    business_registration_number: business_registration_number,
    hours: dateRegisterData.hours, // dateRegisterData가 {"0": {...}, "1": {...}, ...} 형태여야 합니다.
  };

  try {
    // STORE_HOURS 테이블에 영업시간 등록
    const business = await StoreHours.create(storeHoursData);
    console.log("Business Hours successfully registered:", business);

    return business;
  } catch (error) {
    console.error(error)
    throw new Error("Failed to create business hours");
  }
};

const dayOnOffEdit = async (business_registration_number, dateRegisterData) => {
  console.log(business_registration_number);
  console.log(dateRegisterData.hours);
  console.log(dateRegisterData.store_id);

  try {
    let sql = "";
    sql += "UPDATE store_hours SET hours = JSON_SET( hours, ";
    sql += "'$.\"0\".isOperatingDay', :isOperatingDay0, ";
    sql += "'$.\"1\".isOperatingDay', :isOperatingDay1, ";
    sql += "'$.\"2\".isOperatingDay', :isOperatingDay2, ";
    sql += "'$.\"3\".isOperatingDay', :isOperatingDay3, ";
    sql += "'$.\"4\".isOperatingDay', :isOperatingDay4, ";
    sql += "'$.\"5\".isOperatingDay', :isOperatingDay5, ";
    sql += "'$.\"6\".isOperatingDay', :isOperatingDay6 ";
    sql += ") WHERE store_id = :store_id";

    // SQL 쿼리 실행
    const [results, metadata] = await sequelize.query(sql, {
      replacements: {
        store_id: dateRegisterData.store_id,
        isOperatingDay0: dateRegisterData.hours[0].isOperatingDay,
        isOperatingDay1: dateRegisterData.hours[1].isOperatingDay,
        isOperatingDay2: dateRegisterData.hours[2].isOperatingDay,
        isOperatingDay3: dateRegisterData.hours[3].isOperatingDay,
        isOperatingDay4: dateRegisterData.hours[4].isOperatingDay,
        isOperatingDay5: dateRegisterData.hours[5].isOperatingDay,
        isOperatingDay6: dateRegisterData.hours[6].isOperatingDay,
      },
      type: sequelize.QueryTypes.UPDATE, // UPDATE 쿼리 실행
      logging: console.log, // 쿼리 로그 출력
    });

    console.log(metadata); // 메타데이터 확인
    console.log(results); // 실행 결과 확인
    return results;
  } catch (error) {
    console.error(error)
    throw new Error("Failed to update business hours: " + error.message);
  }
};

const dateEdit = async (business_registration_number, dateRegisterData) => {
  console.log(dateRegisterData.hours);
  console.log(dateRegisterData.store_id);

  try {
    let sql = "";
    sql += "UPDATE store_hours SET hours = JSON_SET( hours, ";
    sql += "'$.\"0\".start_time', :startTime0, '$.\"0\".end_time', :endTime0, "; // Sunday
    sql += "'$.\"1\".start_time', :startTime1, '$.\"1\".end_time', :endTime1, "; // Monday
    sql += "'$.\"2\".start_time', :startTime2, '$.\"2\".end_time', :endTime2, "; // Tuesday
    sql += "'$.\"3\".start_time', :startTime3, '$.\"3\".end_time', :endTime3, "; // Wednesday
    sql += "'$.\"4\".start_time', :startTime4, '$.\"4\".end_time', :endTime4, "; // Thursday
    sql += "'$.\"5\".start_time', :startTime5, '$.\"5\".end_time', :endTime5, "; // Friday
    sql += "'$.\"6\".start_time', :startTime6, '$.\"6\".end_time', :endTime6 "; // Saturday
    sql += ") WHERE store_id = :store_id";

    // SQL 쿼리 실행
    const [results, metadata] = await sequelize.query(sql, {
      replacements: {
        store_id: dateRegisterData.store_id,
        startTime0: dateRegisterData.hours[0].start_time,
        endTime0: dateRegisterData.hours[0].end_time,
        startTime1: dateRegisterData.hours[1].start_time,
        endTime1: dateRegisterData.hours[1].end_time,
        startTime2: dateRegisterData.hours[2].start_time,
        endTime2: dateRegisterData.hours[2].end_time,
        startTime3: dateRegisterData.hours[3].start_time,
        endTime3: dateRegisterData.hours[3].end_time,
        startTime4: dateRegisterData.hours[4].start_time,
        endTime4: dateRegisterData.hours[4].end_time,
        startTime5: dateRegisterData.hours[5].start_time,
        endTime5: dateRegisterData.hours[5].end_time,
        startTime6: dateRegisterData.hours[6].start_time,
        endTime6: dateRegisterData.hours[6].end_time,
      },
      type: sequelize.QueryTypes.UPDATE, // UPDATE 쿼리 실행
      logging: console.log, // 쿼리 로그 출력
    });
    return results;
  } catch (error) {
    console.error(error)
    throw new Error("Failed to update business hours: " + error.message);
  }
};

const informationEditGet = async (business_registration_number) => {
  console.log(business_registration_number);

  try {
    const BeautySignificant = await BusinessInformation.findOne({
      where: { business_registration_number: business_registration_number },
    });
    return BeautySignificant;
  } catch (error) {
    // 오류를 더욱 상세하게 로깅
    console.error(error)
    throw new Error(
      "Failed to create RegisterBeautySignificant: " + error.message
    );
  }
};

const informationEditUpdateNoFile = async (
  informationData,
  business_information_id
) => {
  console.log(business_information_id);
  console.log(informationData);
  const business_phone =
    informationData.business_phone1 +
    "-" +
    informationData.business_phone2 +
    "-" +
    informationData.business_phone3;
  console.log(business_phone);
  try {
    const result = await BusinessInformation.update(
      {
        business_name: informationData.business_name,
        address_postcode: informationData.address_postcode,
        address_road: informationData.address_road,
        address_jibun: informationData.address_jibun,
        address_detail: informationData.address_detail,
        business_no_show: informationData.business_no_show,
        business_comment: informationData.business_comment,
        business_phone: business_phone,
      },
      {
        where: {
          business_information_id: business_information_id,
        },
      }
    );
    return result;
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to fetch pet updateNoFile: ${error.message}`);
  }
};

const informationUpdateYesMainFile = async (
  informationData,
  business_information_id
) => {
  const business_phone =
    informationData.business_phone1 +
    "-" +
    informationData.business_phone2 +
    "-" +
    informationData.business_phone3;
  console.log(business_phone);

  try {
    const result = await BusinessInformation.update(
      {
        business_name: informationData.business_name,
        address_postcode: informationData.address_postcode,
        address_road: informationData.address_road,
        address_jibun: informationData.address_jibun,
        address_detail: informationData.address_detail,
        business_no_show: informationData.business_no_show,
        business_comment: informationData.business_comment,
        business_phone: business_phone,
        business_main_image: informationData.business_main_image,
      },
      {
        where: {
          business_information_id: business_information_id,
        },
      }
    );
    return result;
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to fetch pet updateNoFile: ${error.message}`);
  }
};

const informationUpdateYesPricingFile = async (
  informationData,
  business_information_id
) => {
  console.log("informationUpdateYesMainFile");
  console.log(business_information_id);

  const business_phone =
    informationData.business_phone1 +
    "-" +
    informationData.business_phone2 +
    "-" +
    informationData.business_phone3;
  console.log(business_phone);

  try {
    const result = await BusinessInformation.update(
      {
        business_name: informationData.business_name,
        address_postcode: informationData.address_postcode,
        address_road: informationData.address_road,
        address_jibun: informationData.address_jibun,
        address_detail: informationData.address_detail,
        business_no_show: informationData.business_no_show,
        business_comment: informationData.business_comment,
        business_phone: business_phone,
        business_price_image1: informationData.business_price_image1,
        business_price_image2: informationData.business_price_image2,
        business_price_image3: informationData.business_price_image3,
      },
      {
        where: {
          business_information_id: business_information_id,
        },
      }
    );
    return result;
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to fetch pet updateNoFile: ${error.message}`);
  }
};

const informationUpdateYesMainAndPricingFile = async (
  informationData,
  business_information_id
) => {
  const business_phone =
    informationData.business_phone1 +
    "-" +
    informationData.business_phone2 +
    "-" +
    informationData.business_phone3;
  console.log(business_phone);

  try {
    const result = await BusinessInformation.update(
      {
        business_name: informationData.business_name,
        address_postcode: informationData.address_postcode,
        address_road: informationData.address_road,
        address_jibun: informationData.address_jibun,
        address_detail: informationData.address_detail,
        business_no_show: informationData.business_no_show,
        business_comment: informationData.business_comment,
        business_phone: business_phone,
        business_main_image: informationData.business_main_image,
        business_price_image1: informationData.business_price_image1,
        business_price_image2: informationData.business_price_image2,
        business_price_image3: informationData.business_price_image3,
      },
      {
        where: {
          business_information_id: business_information_id,
        },
      }
    );
    return result;
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to fetch pet updateNoFile: ${error.message}`);
  }
};

const beautyOptionGet = async (business_registration_number) => {
  try {
    const BeautySignificant = await BusinessBeautyOption.findOne({
      where: { business_registration_number: business_registration_number },
    });
    console.log(BeautySignificant);
    return BeautySignificant;
  } catch (error) {
    console.error(error)
    throw new Error(
      "Failed to create RegisterBeautySignificant: " + error.message
    );
  }
};

const updateBusinessBeautyOption = async (
  RegisterBeautyOption,
  business_registration_number
) => {
  try {
    const result = await BusinessBeautyOption.update(
      {
        business_beauty_option1: RegisterBeautyOption.business_beauty_option1,
        business_beauty_option2: RegisterBeautyOption.business_beauty_option2,
        business_beauty_option3: RegisterBeautyOption.business_beauty_option3,
        business_beauty_option4: RegisterBeautyOption.business_beauty_option4,
        business_beauty_option5: RegisterBeautyOption.business_beauty_option5,
      },
      {
        where: { business_registration_number: business_registration_number },
      }
    );
    return result;
  } catch (error) {
    // 오류를 더욱 상세하게 로깅
    console.error(error)
    throw new Error(
      "Failed to create RegisterBeautySignificant: " + error.message
    );
  }
};

const accountNumber = async (
  accountNumberData,
  business_registration_number
) => {
  try {
    const business = await BusinessAccountNumber.create({
      business_registration_number: business_registration_number,
      bank_code: accountNumberData.bankCode,
      account_holder: accountNumberData.accountHolder,
      account_number: accountNumberData.accountNumber,
    });

    return business;
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to create business: ${error.message}`);
  }
};


const accountNumberList = async (business_registration_number) => {
  try {
    const results = await BusinessAccountNumber.findAll({
      where: { business_registration_number },
      attributes: ["account_holder", "account_number"],
      include: [
        {
          model: BankInformation,
          attributes: ["name"], 
          required: true,
        },
      ],
      logging: console.log, 
    });

    console.log(results);
    return results;
  } catch (error) {
    console.error(error)
    throw new Error("Failed to fetch business details");
  }
};

const significantGet = async (business_registration_number) => {

  try {
    const BeautySignificant = await BusinessBeautySignificant.findOne({
      where: { business_registration_number: business_registration_number },
    });
    return BeautySignificant;
  } catch (error) {
    console.error(error)
    throw new Error(
      "Failed to create RegisterBeautySignificant: " + error.message
    );
  }
};

const desingerList = async (business_registration_number) => {

  try {
    const result = await BusinessDesinger.findAll({
      where: { business_registration_number: business_registration_number },
    });
    return result;
  } catch (error) {
    console.error(error)
    throw new Error(
      "Failed to create RegisterBeautySignificant: " + error.message
    );
  }
};

module.exports = {
  createBusiness,
  businessLogin,
  createBusinessInformation,
  getBusinesses,
  getBusinessDetailsById,
  createBusinessDesinger,
  updateBusinessBeautySignificant,
  significantGet,
  getDateEdit,
  dateRegister,
  dayOnOffEdit,
  dateEdit,
  informationEditGet,
  informationEditUpdateNoFile,
  informationUpdateYesMainFile,
  informationUpdateYesPricingFile,
  informationUpdateYesMainAndPricingFile,
  beautyOptionGet,
  updateBusinessBeautyOption,
  checkLogin,
  accountNumber,
  accountNumberList,
  accountNumberGet,
  desingerList,
};
