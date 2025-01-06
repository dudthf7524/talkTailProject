
// 새로운 업체를 생성하는 함수

const bcrypt = require('bcrypt');

const { BusinessInformation, sequelize } = require("../models");
const { BusinessDesinger } = require("../models");
const { Business } = require("../models");
const { BusinessBeautySignificant } = require("../models");
const { StoreHours } = require("../models");



const createBusiness = async (businessInfo) => {
    const business_owner_phone = businessInfo.business_owner_phone1 + "-" + businessInfo.business_owner_phone2 + "-" + businessInfo.business_owner_phone3;
    console.log('데이터베이스 저장 코드')
    console.log(businessInfo)
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
        throw new Error('Failed to create business', error.message);
    }
};

const createBusinessInformation = async (businessInformationInfo) => {
    console.log("serverce")
    console.log(businessInformationInfo)
    const business_phone = businessInformationInfo.business_phone1 + "-" + businessInformationInfo.business_phone2 + "-" + businessInformationInfo.business_phone3;
    const t = await sequelize.transaction(); // 트랜잭션 시작

    try {
        // 1. 사업자 정보 저장
        const businessInformation = await BusinessInformation.create({
            business_registration_number: businessInformationInfo.business_registration_number,
            business_main_image: businessInformationInfo.business_main_image,
            business_price_image1: businessInformationInfo.business_price_image1,
            business_price_image2: businessInformationInfo.business_price_image2,
            business_price_image3: businessInformationInfo.business_price_image3,
            business_name: businessInformationInfo.business_name,
            address_postcode: businessInformationInfo.address_postcode,
            address_road: businessInformationInfo.address_road,
            address_jibun: businessInformationInfo.address_jibun,
            address_detail: businessInformationInfo.address_detail,
            weekday_open_time: businessInformationInfo.weekday_open_time,
            weekday_close_time: businessInformationInfo.weekday_close_time,
            weekend_open_time: businessInformationInfo.weekend_open_time,
            weekend_close_time: businessInformationInfo.weekend_close_time,
            dayon: businessInformationInfo.dayon,
            dayoff: businessInformationInfo.dayoff,
            business_phone: business_phone,
            business_comment: businessInformationInfo.business_comment,
            business_no_show: businessInformationInfo.business_no_show,
            created_at: new Date(),
            updated_at: new Date(),
        }, { transaction: t });

        // 2. 사업자 특이사항 저장 (디폴트 값 저장)
        const beautySignificant = await BusinessBeautySignificant.create({
            business_registration_number: businessInformationInfo.business_registration_number,
        }, { transaction: t });


        // 커밋하여 모든 작업을 완료
        await t.commit();

        // 두 개의 데이터를 객체로 묶어서 반환
        return {
            businessInformation,
            beautySignificant
        };

    } catch (error) {
        // 오류 발생 시 롤백
        await t.rollback();
        throw new Error('Failed to create business information and beauty significant.', error.message);
    }
};

const createBusinessDesinger = async (businessInfo) => {
    console.log('데이터베이스 저장 코드')
    console.log(businessInfo)
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
        throw new Error('Failed to create business', error.message);
    }
};

const businessLogin = async (login_id, login_password) => {
    try {

        // business 테이블에서 login_id (business_id)에 해당하는 사업자 정보 조회
        const business = await Business.findOne({
            where: { login_id: login_id },  // login_id는 business_id에 해당
        });

        if (!business) {
            // 해당 사업자가 존재하지 않으면 null 반환
            return null;
        }
        // bcrypt를 사용하여 비밀번호 비교
        const isPasswordValid = await bcrypt.compare(login_password, business.login_password);

        if (!isPasswordValid) {
            return null;  // 비밀번호 불일치하면 null 반환
        }


        // 사업자가 존재하면 해당 사업자 객체 반환
        return business;
    } catch (error) {
        console.error('Error in business login:', error);
        throw new Error('Failed to fetch business data');
    }
};

const getBusinesses = async () => {
    try {
        // 비즈니스 데이터 가져오기
        const businessesInformation = await BusinessInformation.findAll({
            //where: { category },
            //attributes: ['id', 'name', 'location'],
        });
        return businessesInformation;

    } catch (error) {
        console.error('Error fetching businesses with details:', error);
        throw new Error('Failed to fetch businesses with details');
    }
};

const getBusinessDetailsById = async (id) => {
    console.log(id)
    console.log('aaa')

    try {
        const businessInformationById = await BusinessInformation.findOne({
            where: { business_information_id: id },
            //attributes: {
            //exclude: ['business_registration_name', 'business_registration_number', 'business_owner']
            //}
        });
        console.log("상세보기")
        console.log(businessInformationById)





        return businessInformationById;
    } catch (error) {
        throw new Error('Failed to fetch business details');
    }
};

const updateBusinessBeautySignificant = async (RegisterBeautySignificant) => {
    console.log(RegisterBeautySignificant)
    console.log("aaaaaaaaaaaaaaaaaazzzzzzzzzzzzzzzzzzzzz")
    console.log("aaaaaaaaaaaaaaaaaazzzzzzzzzzzzzzzzzzzzz")
    console.log("aaaaaaaaaaaaaaaaaazzzzzzzzzzzzzzzzzzzzz")
    console.log("aaaaaaaaaaaaaaaaaazzzzzzzzzzzzzzzzzzzzz")
    try {
        const BeautySignificant = await BusinessBeautySignificant.update(
            {
                business_beauty_significant1: RegisterBeautySignificant.business_beauty_significant1,
                business_beauty_significant2: RegisterBeautySignificant.business_beauty_significant2,
                business_beauty_significant3: RegisterBeautySignificant.business_beauty_significant3,
                business_beauty_significant4: RegisterBeautySignificant.business_beauty_significant4,
                business_beauty_significant5: RegisterBeautySignificant.business_beauty_significant5,
            },
            {
                where: { business_registration_number: RegisterBeautySignificant.business_registration_number }
            }

        );
        return BeautySignificant;
    } catch (error) {
        // 오류를 더욱 상세하게 로깅
        console.error('Error creating BusinessBeautySignificant:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        throw new Error('Failed to create RegisterBeautySignificant: ' + error.message);
    }
};

const significantGet = async (business_registration_number) => {
    console.log(business_registration_number)

    try {


        let sql = "";
        sql += "select business_beauty_significant1 , business_beauty_significant2, business_beauty_significant3 ,business_beauty_significant4 ,business_beauty_significant5 , business_owner_phone ";
        sql += "from business_beauty_significant bbs ";
        sql += "join business b ";
        sql += "on bbs.business_registration_number = b.business_registration_number ";
        sql += "where b.business_registration_number = :business_registration_number ";

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
        return results


    } catch (error) {
        // 오류를 더욱 상세하게 로깅
        console.error('Error creating BusinessBeautySignificant:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        throw new Error('Failed to create RegisterBeautySignificant: ' + error.message);
    }
};

const getDateEdit = async (business_registration_number) => {
    console.log(business_registration_number)

    try {
        let sql = "";
        sql += "select * from store_hours ";
        sql += "where business_registration_number = :business_registration_number ";

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
        return results


    } catch (error) {
        // 오류를 더욱 상세하게 로깅
        console.error('Error creating BusinessBeautySignificant:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        throw new Error('Failed to create RegisterBeautySignificant: ' + error.message);
    }
};

const dateRegister = async (business_registration_number, dateRegisterData) => {
    console.log(business_registration_number)
    console.log(dateRegisterData)
    const storeHoursData = {
        business_registration_number: business_registration_number,
        hours: dateRegisterData // dateRegisterData가 {"0": {...}, "1": {...}, ...} 형태여야 합니다.
    };

    try {
        // STORE_HOURS 테이블에 영업시간 등록
        const business = await StoreHours.create(storeHoursData);
        console.log('Business Hours successfully registered:', business);

        return business;
    } catch (error) {
        console.error('Failed to create business hours:', error);
        throw new Error('Failed to create business hours');
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
};