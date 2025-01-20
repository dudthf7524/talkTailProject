import "../../CSS/home.css";

const Privacy = ({ openModal }) => {
  return (
    <div className="privacy homeModal">
      <img onClick={openModal} src="/PageImage/components/X.svg" alt="" />
      <p className="title">개인정보 처리방침</p>
      <p className="content">내용</p>
    </div>
  );
};

export default Privacy;
