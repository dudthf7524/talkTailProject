const express = require("express");
const router = express.Router();
const businessDatabase = require("../database/businessDatabase");
const bcrypt = require("bcrypt");
const passport = require("passport");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const imgNaverCloud = require("../imageUpload/imgNaverCloud");
const authMiddleware = require("../middleware/authMiddleware");
const authMiddlewareSession = require("../middleware/authMiddlewareSession");

router.post("/businesses", async (req, res) => {
  console.log(req.body);
  try {
    console.log("라우터 저장 코드");

    const formData = req.body; // 폼 데이터
    console.log(formData);
    const password = await bcrypt.hash(req.body.login_password, 10);

    formData.login_password = password;

    // 비즈니스 데이터 생성

    const business = await businessDatabase.createBusiness(formData);

    res.status(201).json({ business });
  } catch (error) {
    console.error("Error creating business", error.message);
    res.status(500).json({ error: error.message });
  }
<<<<<<< HEAD
=======
})

router.post('/business/check/password', authMiddlewareSession, async (req, res) => {


  const registrationNumber = req.user.registrationNumber;

  try {
    const password = req.body.password;

    const business = await businessDatabase.checkPassowrd(password, registrationNumber);

    res.status(201).json(business);
  } catch (error) {
    console.error('Error creating business', error.message);
    res.status(500).json({ error: error.message });
  }
})

router.put('/business/check/password', authMiddlewareSession, async (req, res) => {

  console.log(req.body)
  const registrationNumber = req.user.registrationNumber;

  try {
    const new_password = await bcrypt.hash(req.body.new_password, 10);
    const business = await businessDatabase.updatePassowrd(new_password, registrationNumber);

    res.status(201).json(business);
  } catch (error) {
    console.error('Error creating business', error.message);
    res.status(500).json({ error: error.message });
  }
})


router.post('/business/checkLogin', async (req, res) => {
  console.log(req.body)
  const login_id = req.body.login_id;

  console.log(login_id)


  try {

    const business = await businessDatabase.checkLogin(login_id);
    res.status(201).json(business);

  } catch (error) {
    console.error('Error creating business', error.message);
    res.status(500).json({ error: error.message });
  }

})

router.post('/business/register/information', upload.fields([
  { name: 'main', maxCount: 1 },
  { name: 'sub', maxCount: 50 },
  { name: 'album', maxCount: 50 },
  { name: 'review', maxCount: 50 },
  { name: 'pricing', maxCount: 10 }
]), async (req, res) => {

  try {
    const files = req.files; // 업로드된 파일들
    const formData = req.body; // 폼 데이터
    console.log(formData)

    if (!files) {
      throw new Error('No files uploaded.');
    }

    // 이미지 업로드 및 URL 가져오기
    if (!files || Object.keys(files).length === 0) {
      return res.status(400).send('No files uploaded.');
    }

    const fileArray = [];
    Object.keys(files).forEach(key => {
      fileArray.push(...files[key]);
    });
    const imageUploadResults = await imgNaverCloud.uploadMultipleImages(fileArray);
    //const businessRegisterDesinger = await businessDatabase.createBusinessBeautySignificant(RegisterBeautySignificant);

    console.log(imageUploadResults)
    // 비즈니스 데이터 생성
    const businessData = {
      ...formData,

    };

    // imageUploadResults를 분류하여 businessData에 추가
    const pricingImages = [];
    imageUploadResults.forEach(result => {
      if (result.image_type === 'main') {
        businessData.business_main_image = result.url; // main 이미지는 business_main_image에 저장
      } else if (result.image_type === 'pricing') {
        pricingImages.push(result.url); // pricing 이미지는 배열에 저장
      }
    });

    // pricing 이미지를 순서대로 business_price_image1, business_price_image2, ...에 저장
    pricingImages.forEach((url, index) => {
      businessData[`business_price_image${index + 1}`] = url;
    });

    console.log(businessData)
    const business = await businessDatabase.createBusinessInformation(businessData);

    res.status(201).json({ business, imageUploadResults });
  } catch (error) {
    console.error('Error creating business with images:', error.message);
    res.status(500).json({ error: error.message });
  }

>>>>>>> client
});

router.post("/business/checkLogin", async (req, res) => {
  console.log(req.body);
  const login_id = req.body.login_id;

  console.log(login_id);

  try {
    const business = await businessDatabase.checkLogin(login_id);
    res.status(201).json(business);
  } catch (error) {
    console.error("Error creating business", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post(
  "/business/register/information",
  upload.fields([
    { name: "main", maxCount: 1 },
    { name: "sub", maxCount: 50 },
    { name: "album", maxCount: 50 },
    { name: "review", maxCount: 50 },
    { name: "pricing", maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      const files = req.files; // 업로드된 파일들
      const formData = req.body; // 폼 데이터
      console.log(formData);

      if (!files) {
        throw new Error("No files uploaded.");
      }

      // 이미지 업로드 및 URL 가져오기
      if (!files || Object.keys(files).length === 0) {
        return res.status(400).send("No files uploaded.");
      }

      const fileArray = [];
      Object.keys(files).forEach((key) => {
        fileArray.push(...files[key]);
      });
      const imageUploadResults = await imgNaverCloud.uploadMultipleImages(
        fileArray
      );
      //const businessRegisterDesinger = await businessDatabase.createBusinessBeautySignificant(RegisterBeautySignificant);

      console.log(imageUploadResults);
      // 비즈니스 데이터 생성
      const businessData = {
        ...formData,
      };

      // imageUploadResults를 분류하여 businessData에 추가
      const pricingImages = [];
      imageUploadResults.forEach((result) => {
        if (result.image_type === "main") {
          businessData.business_main_image = result.url; // main 이미지는 business_main_image에 저장
        } else if (result.image_type === "pricing") {
          pricingImages.push(result.url); // pricing 이미지는 배열에 저장
        }
      });

      // pricing 이미지를 순서대로 business_price_image1, business_price_image2, ...에 저장
      pricingImages.forEach((url, index) => {
        businessData[`business_price_image${index + 1}`] = url;
      });

      console.log(businessData);
      const business = await businessDatabase.createBusinessInformation(
        businessData
      );

      res.status(201).json({ business, imageUploadResults });
    } catch (error) {
      console.error("Error creating business with images:", error.message);
      res.status(500).json({ error: error.message });
    }
  }
);

router.post("/business/login", async (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error)
      return res
        .status(500)
        .json({ message: "서버 오류가 발생했습니다.", error });
    if (!user) return res.status(401).json({ message: info.message });

    req.login(user, (err) => {
      if (err) return next(err);

      // 세션 상태 확인

      return res.status(200).json({
        message: "로그인 성공",
        user: {
          id: user.login_id,
          name: user.business_owner_name,
        },
      });
    });
  })(req, res, next);
});

router.get("/business/logout", (req, res) => {
  console.log(req.session);
  console.log("로그아웃 요청 도착");
  console.log("현재 로그인 상태:", req.isAuthenticated());

  if (!req.isAuthenticated()) {
    console.log("로그인 상태가 아닙니다.");
    return res.status(400).json({ message: "로그인 상태가 아닙니다." });
  }

  req.logout((err) => {
    if (err) {
      console.error("로그아웃 오류:", err);
      return res.status(500).json({ message: "로그아웃 실패", error: err });
    }

    req.session.destroy(() => {
      console.log("세션 삭제 완료");
      res.clearCookie("connect.sid");
      console.log("쿠키 삭제 완료");
      return res.status(200).json({ message: "로그아웃 성공" });
    });
  });
});

router.get("/businesses/information", authMiddleware, async (req, res) => {
  console.log("검색할 때마다 데이터베이스를 조회한다");

  try {
    const { category } = req.query;
    const businessesInformation = await businessDatabase.getBusinesses();
    res.json(businessesInformation);
  } catch (error) {
    console.error("Error fetching businesses:", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get("/business/detail/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const businessInformationById =
      await businessDatabase.getBusinessDetailsById(id);
    res.json(businessInformationById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post(
  "/business/register/desinger",
  authMiddlewareSession,
  async (req, res) => {
    console.log(req.body);
    try {
      const RegisterDesinger = req.body;

      RegisterDesinger.business_registration_number =
        req.user.business_registration_number;

      const businessRegisterDesinger =
        await businessDatabase.createBusinessDesinger(RegisterDesinger);

      res.status(201).json({ businessRegisterDesinger });
    } catch (error) {
      console.error("Error creating business with images:", error.message);
      res.status(500).json({ error: error.message });
    }
  }
);

router.put("/business/beauty/significant", async (req, res) => {
  try {
    console.log(req.body);

    const RegisterBeautySignificant = req.body;

    const businessRegisterDesinger =
      await businessDatabase.updateBusinessBeautySignificant(
        RegisterBeautySignificant
      );

    res.status(201).json({ businessRegisterDesinger });
  } catch (error) {
    console.error("Error creating business with images:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get(
  "/business/style/significantGet",
  authMiddlewareSession,
  async (req, res) => {
    console.log(req.session);
    console.log(req.session.user);
    console.log("req.user");
    console.log(req.user.business_registration_number);
    const business_registration_number = req.user.business_registration_number;

    try {
      const userGetAuthority = await businessDatabase.significantGet(
        business_registration_number
      );
      res.json(userGetAuthority);
    } catch (error) {
      console.error("Failed to fetch authority request error: ", error);
      res.status(500).json({ message: "Failed to fetch authority request." });
    }
  }
);

router.get("/business/date/edit", authMiddlewareSession, async (req, res) => {
  const business_registration_number = req.user.registrationNumber;

  try {
    const getDateEditData = await businessDatabase.getDateEdit(
      business_registration_number
    );
    res.json(getDateEditData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch authority request." });
  }
});

router.post(
  "/business/date/register",
  authMiddlewareSession,
  async (req, res) => {
    const business_registration_number = req.user.registrationNumber;
    const dateRegisterData = req.body;
    try {
      const getDateEditData = await businessDatabase.dateRegister(
        business_registration_number,
        dateRegisterData
      );
      res.json(getDateEditData);
    } catch (error) {
      console.error("Failed to fetch authority request error: ", error);
      res.status(500).json({ message: "Failed to fetch authority request." });
    }
  }
);

router.put(
  "/business/day-on-off/edit",
  authMiddlewareSession,
  async (req, res) => {
    const business_registration_number = req.user.registrationNumber;
    const dateRegisterData = req.body;

    console.log(business_registration_number);
    console.log(dateRegisterData);
    try {
      const getDateEditData = await businessDatabase.dayOnOffEdit(
        business_registration_number,
        dateRegisterData
      );
      res.json(getDateEditData);
    } catch (error) {
      console.error("Failed to fetch authority request error: ", error);
      res.status(500).json({ message: "Failed to fetch authority request." });
    }
  }
);

router.put("/business/date/edit", authMiddlewareSession, async (req, res) => {
  const business_registration_number = req.user.registrationNumber;
  const dateRegisterData = req.body;

  console.log(business_registration_number);
  console.log(dateRegisterData);
  try {
    const getDateEditData = await businessDatabase.dateEdit(
      business_registration_number,
      dateRegisterData
    );
    res.json(getDateEditData);
  } catch (error) {
    console.error("Failed to fetch authority request error: ", error);
    res.status(500).json({ message: "Failed to fetch authority request." });
  }
});

router.get(
  "/business/information/edit",
  authMiddlewareSession,
  async (req, res) => {
    const business_registration_number = req.user.registrationNumber;
    try {
      const getInformation = await businessDatabase.informationEditGet(
        business_registration_number
      );
      res.json(getInformation);
    } catch (error) {
      console.error("Failed to fetch authority request error: ", error);
      res.status(500).json({ message: "Failed to fetch authority request." });
    }
  }
);

router.put(
  "/business/edit/information",
  upload.fields([
    { name: "main", maxCount: 1 },
    { name: "pricing", maxCount: 3 },
  ]),
  async (req, res) => {
    console.log("req.body : ", req.body);
    // console.log(req.body);
    // console.log(req.files);
    // console.log(req.files.main);
    // console.log(req.files.pricing);

    const business_information_id = req.body.business_information_id;
    const formData = req.body;
    const files = req.files;
    const fileArray = [];

    Object.keys(files).forEach((key) => {
      fileArray.push(...files[key]);
    });

    const imageUploadResults = await imgNaverCloud.uploadMultipleImages(
      fileArray
    );

    // 비즈니스 데이터 생성
    const informationData = {
      ...formData,
    };

    // imageUploadResults를 분류하여 businessData에 추가
    const pricingImages = [];
    imageUploadResults.forEach((result) => {
      if (result.image_type === "main") {
        informationData.business_main_image = result.url; // main 이미지는 business_main_image에 저장
      } else if (result.image_type === "pricing") {
        pricingImages.push(result.url); // pricing 이미지는 배열에 저장
      }
    });

    informationData.business_price_image1 = "";
    informationData.business_price_image2 = "";
    informationData.business_price_image3 = "";

    // pricing 이미지를 순서대로 business_price_image1, business_price_image2, ...에 저장
    pricingImages.forEach((url, index) => {
      informationData[`business_price_image${index + 1}`] = url;
    });

    if (req.files.main && !req.files.pricing) {
      console.log("메인이 있다");

      if (formData.business_main_image) {
        await imgNaverCloud.deleteImage(formData.business_main_image);
      }
      const result = await businessDatabase.informationUpdateYesMainFile(
        informationData,
        business_information_id
      );

      res.json(result);
    } else if (req.files.pricing && !req.files.main) {
      console.log("가격표가 있다");
      const priceImages = [
        formData.business_price_image1,
        formData.business_price_image2,
        formData.business_price_image3,
      ];

      // 모든 이미지를 순회하며 삭제
      for (const image of priceImages) {
        if (image) {
          await imgNaverCloud.deleteImage(image);
        }
      }

      const result = await businessDatabase.informationUpdateYesPricingFile(
        informationData,
        business_information_id
      );

      res.json(result);
    } else if (req.files.main && req.files.pricing) {
      console.log("메인이 있다");
      console.log("가격표가 있다");

      const priceImages = [
        formData.business_main_image,
        formData.business_price_image1,
        formData.business_price_image2,
        formData.business_price_image3,
      ];

      // 모든 이미지를 순회하며 삭제
      for (const image of priceImages) {
        if (image) {
          await imgNaverCloud.deleteImage(image);
        }
      }
      const result =
        await businessDatabase.informationUpdateYesMainAndPricingFile(
          informationData,
          business_information_id
        );

      res.json(result);
    } else {
      console.log("둘다 없다");
      try {
        const getInformation =
          await businessDatabase.informationEditUpdateNoFile(
            informationData,
            business_information_id
          );
        res.json(getInformation);
      } catch (error) {
        console.error("Failed to fetch authority request error: ", error);
        res.status(500).json({ message: "Failed to fetch authority request." });
      }
    }
  }
);

router.get(
  "/business/beauty/option",
  authMiddlewareSession,
  async (req, res) => {
    console.log("검색할 때마다 데이터베이스를 조회한다");
    console.log(req.user);
    console.log(req.user.registrationNumber);

    const business_registration_number = req.user.registrationNumber;

    try {
      const userGetAuthority = await businessDatabase.beautyOptionGet(
        business_registration_number
      );
      res.json(userGetAuthority);
    } catch (error) {
      console.error("Failed to fetch authority request error: ", error);
      res.status(500).json({ message: "Failed to fetch authority request." });
    }
  }
);

router.put(
  "/business/beauty/option",
  authMiddlewareSession,
  async (req, res) => {
    console.log(req.body);
    const business_registration_number = req.user.registrationNumber;
    const RegisterBeautyOption = req.body;
    try {
      const result = await businessDatabase.updateBusinessBeautyOption(
        RegisterBeautyOption,
        business_registration_number
      );

      res.status(201).json({ result });
    } catch (error) {
      console.error("Error creating business with images:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.post(
  "/business/account/number",
  authMiddlewareSession,
  async (req, res) => {
    console.log(req.body);
    const business_registration_number = req.user.registrationNumber;
    console.log(business_registration_number);
    const accountNumberData = req.body;
    try {
      const result = await businessDatabase.accountNumber(
        accountNumberData,
        business_registration_number
      );

<<<<<<< HEAD
      res.status(201).json({ result });
    } catch (error) {
      console.error("Error creating business with images:", error);
      res.status(500).json({ error: error.message });
    }
=======
  const business_registration_number = req.user.registrationNumber;


  try {
    const result = await businessDatabase.accountNumberList(business_registration_number);

    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating business with images:', error);
    res.status(500).json({ error: error.message });
>>>>>>> client
  }
);

router.get(
  "/business/account/number/list",
  authMiddlewareSession,
  async (req, res) => {
    const business_registration_number = req.user.registrationNumber;

    try {
      const result = await businessDatabase.accountNumberList(
        business_registration_number
      );

      res.status(201).json(result);
    } catch (error) {
      console.error("Error creating business with images:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

router.post("/business/style/accountNumberGet", async (req, res) => {
  const business_registration_number = req.body.business_registration_number;

  try {
    const userGetAuthority = await businessDatabase.accountNumberGet(
      business_registration_number
    );
    res.json(userGetAuthority);
  } catch (error) {
    console.error("Failed to fetch authority request error: ", error);
    res.status(500).json({ message: "Failed to fetch authority request." });
  }
});

<<<<<<< HEAD
router.get(
  "/business/desinger/list",
  authMiddlewareSession,
  async (req, res) => {
    console.log(req.user.registrationNumber);
=======
router.get('/business/desinger/list', authMiddlewareSession, async (req, res) => {
>>>>>>> client

    const business_registration_number = req.user.registrationNumber;
    try {
      const result = await businessDatabase.desingerList(
        business_registration_number
      );
      res.json(result);
    } catch (error) {
      console.error("Failed to fetch authority request error: ", error);
      res.status(500).json({ message: "Failed to fetch authority request." });
    }
  }
);

module.exports = router;
