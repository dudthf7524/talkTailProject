import "../../CSS/home.css";

const Tos = ({ openModal }) => {
  return (
    <div className="tos homeModal">
      <img onClick={openModal} src="/PageImage/components/X.svg" alt="" />
      <p className="title">이용약관</p>
      <p className="content">내용</p>
    </div>
  );
};

export default Tos;
