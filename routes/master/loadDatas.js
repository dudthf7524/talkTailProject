const express = require("express");
const router = express.Router();
const {
  BeautyNotice,
  Business,
  BeautyReservation,
  UserInformation,
  Pet,
  User,
} = require("../../models");

router.get("/loadNotice", async (req, res, next) => {
  try {
    const noticeLists = await BeautyNotice.findAll({
      attributes: [
        "beauty_notice_id",
        "beauty_reservation_id",
        // "createdAt"
      ],
      raw: true,
    });
    const updatedLists = await Promise.all(
      noticeLists.map(async (list) => {
        try {
          const reservationList = await BeautyReservation.findOne({
            where: { beauty_reservation_id: list.beauty_reservation_id },
            attributes: [
              "business_registration_number",
              "platform_id",
              "pet_id",
              "reservation_applicationTime",
              // "createdAt",
            ],
            raw: true,
          });

          if (!reservationList) {
            return list;
          }

          const businessName = await Business.findOne({
            where: {
              business_registration_number:
                reservationList.business_registration_number,
            },
            attributes: ["business_registration_name"],
            raw: true,
          });

          const customerName = await UserInformation.findOne({
            where: { platform_id: reservationList.platform_id },
            attributes: ["user_name"],
            raw: true,
          });

          const petName = await Pet.findOne({
            where: { pet_id: reservationList.pet_id },
            attributes: ["pet_name"],
            raw: true,
          });

          return {
            ...list,
            ...businessName,
            ...customerName,
            ...petName,
            reservation_applicationTime:
              reservationList.reservation_applicationTime,
          };
        } catch (e) {
          console.error(e);
          return list;
        }
      })
    );

    res.status(200).json(updatedLists);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/loadNoticeDetail", async (req, res, next) => {
  try {
    const { noticeId } = req.body;
    const notice = await BeautyNotice.findOne({
      where: { beauty_notice_id: noticeId },
      attributes: { exclude: ["beauty_notice_id", "beauty_reservation_id"] },
      raw: true,
    });

    res.status(200).json(notice);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/loadBusiness", async (req, res, next) => {
  try {
    const businessLists = await Business.findAll({
      attributes: [
        "business_registration_number",
        "business_registration_name",
        "business_owner_phone",
        "created_at",
      ],
      raw: true,
    });
    res.status(200).json(businessLists);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post("/loadBusinessDetail", async (req, res, next) => {
  try {
    const { businessId } = req.body;
    const business = await Business.findOne({
      where: { business_registration_number: businessId },
      attributes: { exclude: ["login_id, login_password"] },
      raw: true,
    });

    res.status(200).json(business);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/loadCustomer", async (req, res, next) => {
  try {
    const userLists = await User.findAll({
      raw: true,
    });

    const customerLists = await Promise.all(
      userLists.map(async (list) => {
        try {
          const customerInfo = await UserInformation.findOne({
            where: { platform_id: list.platform_id },
            raw: true,
          });

          if (!customerInfo) {
            return list;
          }
          return {
            ...list,
            ...customerInfo,
          };
        } catch (e) {
          console.error(e);
          return list;
        }
      })
    );

    res.status(200).json(customerLists);
  } catch (e) {
    console.error(e);
  }
});

router.get("/loadReservation", async (req, res, next) => {
  try {
    const reservationLists = await BeautyReservation.findAll({
      raw: true,
    });

    res.status(200).json(reservationLists);
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
