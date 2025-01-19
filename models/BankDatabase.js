const db = require("./index"); // Sequelize 모델이 정의된 index.js 파일
const sequelize = db.sequelize;

const banks = [
  { name: "KB국민은행", code: "004" },
  { name: "신한은행", code: "088" },
  { name: "하나은행", code: "081" },
  { name: "우리은행", code: "020" },
  { name: "IBK기업은행", code: "003" },
  { name: "농협은행", code: "011" },
  { name: "SC제일은행", code: "023" },
  { name: "카카오뱅크", code: "090" },
  { name: "토스뱅크", code: "092" },
  { name: "케이뱅크", code: "089" },
];

const BankDatabase = async () => {
    try {
      // 데이터베이스에 기존 데이터가 있는지 확인
      const count = await db.BankInformation.count();
      if (count > 0) {
        console.log("초기 은행 데이터가 이미 삽입되어 있습니다.");
        return; // 데이터가 있으면 추가 작업을 하지 않음
      }
  
      // 초기 데이터 삽입
      await Promise.all(
        banks.map((bank) => {
          return db.BankInformation.create(bank);
        })
      );
      console.log("초기 은행 데이터 삽입 완료");
    } catch (error) {
      console.error("데이터베이스 초기화 중 오류:", error);
    }
  };

module.exports = BankDatabase;
