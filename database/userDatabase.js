const { Sequelize } = require('sequelize');


const { UserInformation, BeautyReservation, Pet } = require('../models');
const { User } = require('../models');
// 사용자 ID를 기반으로 사용자 정보를 조회하는 함수
const getUserById = async (platform_id, platform) => {
  try {
    const user = await User.findOne({
      where: {
        platform_id,
        platform,
      },
    });
    if (!user) {
      throw new Error('User not found.');
    }
    return user;
  } catch (error) {
    throw new Error(`Error fetching user by ID: ${error.message}`);
  }
};

const getUserInformation = async (platform_id) => {
  try {
    const userInformation = await UserInformation.findOne({
      where: {
        platform_id,
      },
    });
    return userInformation;
  } catch (error) {
    console.error(error)
    throw new Error(`Error fetching user by ID: ${error.message}`);
  }
};

// 사용자 생성 또는 조회 함수
const findOrCreateUser = async (userInfo) => {
  console.log(userInfo)
  const [user, created] = await User.findOrCreate({
    where: {
      platform_id: userInfo.platform_id,
      platform: userInfo.platform,
    },
    defaults: {
      user_name: userInfo.user_name,
      user_nickname: userInfo.user_nickname,
      user_email: userInfo.user_email,
      user_phone: userInfo.user_phone,
      user_address: '', // 기본값 설정
      created_at: Sequelize.literal('CURRENT_TIMESTAMP'), // 현재 시간으로 설정
      updated_at: Sequelize.literal('CURRENT_TIMESTAMP'), // 현재 시간으로 설정
    },
  });
  return user;
};

const updateUserProfile = async (id, platform, userInfo) => {
  try {
    const updatedFields = {
      user_name: userInfo.name,
      user_nickname: userInfo.nickname,
      user_address: userInfo.address,
      updated_at: new Date(), // Assuming `updated_at` should be updated automatically
    };

    const [rowsUpdated] = await User.update(updatedFields, {
      where: { platform_id: id, platform },
    });

    if (rowsUpdated === 0) {
      throw new Error('User not found or not updated.');
    }

    // 업데이트된 사용자 정보를 조회합니다.
    const updatedUser = await User.findOne({
      where: { platform_id: id, platform },
    });

    if (!updatedUser) {
      throw new Error('Failed to retrieve updated user.');
    }

    console.log('User profile updated successfully:', updatedUser);
    return updatedUser;
  } catch (error) {
    throw new Error(`Error updating user profile: ${error.message}`);
  }
};
const createUserInformation = async (userData) => {
  const userphone = userData.user_phone1 + "-" + userData.user_phone2 + "-" + userData.user_phone3;
  console.log('데이터베이스')
  console.log(userData)
  try {
    const userIformation = await UserInformation.create({
      platform_id: userData.platform_id,
      user_name: userData.user_name,
      user_phone: userphone,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return userIformation;
  } catch (error) {
    throw new Error('Failed to create userInformation', error.message);
  }
};

const userEidt = async (userEditData) => {

  const phone = userEditData.user_phone1 + "-" + userEditData.user_phone2 + "-" + userEditData.user_phone3;
  try {
    const updatedFields = {
      user_name: userEditData.user_name,
      user_phone: phone,
      updated_at: new Date(), // Assuming `updated_at` should be updated automatically
    };

    const [rowsUpdated] = await UserInformation.update(updatedFields, {
      where: { user_information_id: userEditData.user_information_id },
    });

    console.log([rowsUpdated])
    if (rowsUpdated === 0) {
      throw new Error('User not found or not updated.');
    }

    // 업데이트된 사용자 정보를 조회합니다.
    return "수정완료"
  } catch (error) {
    throw new Error(`Error updating user profile: ${error.message}`);
  }
};

const userReservation = async (platform_id) => {
  console.log("데이터베이스 코드")
  console.log(platform_id)
  try {
    const reservationData = await BeautyReservation.findAll({
      where: {
        platform_id: platform_id,
      },
    });

    return reservationData;

  } catch (error) {
    throw new Error(`Failed to register pet: ${error.message}`);
  }
};

const userLoginPet = async (platform_id) => {
  console.log("데이터베이스 코드")
  console.log(platform_id)
  try {
    const result = await Pet.findOne({
      where: {
        platform_id: platform_id,
      },
      attributes: ["pet_name"],
    });

    return result;

  } catch (error) {
    console.error(error)
    throw new Error(`Failed to register pet: ${error.message}`);
  }
};

const userLogin = async (platform_id) => {
  console.log("데이터베이스 코드")
  console.log(platform_id)
  try {
    const result = await UserInformation.findOne({
      where: {
        platform_id: platform_id,
      },
      attributes: ["pet_name"],
    });

    return result;

  } catch (error) {
    console.error(error)
    throw new Error(`Failed to register pet: ${error.message}`);
  }
};

module.exports = {
  findOrCreateUser,
  getUserInformation,
  getUserById,
  updateUserProfile,
  createUserInformation,
  userEidt,
  userReservation,
  userLoginPet,
  userLogin,
};
