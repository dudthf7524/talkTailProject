import React, { useRef, useState } from 'react';
import NButtonContainer from '../Components/NavigatorBar/NButtonContainer';
import '../../CSS/page.css';
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const locationUrl = `${process.env.PUBLIC_URL}/PageImage/home/location.svg`;
  const arrowUrl = `${process.env.PUBLIC_URL}/PageImage/home/arrow.svg`;
  const footArrowUrl = `${process.env.PUBLIC_URL}/PageImage/home/footArrow.svg`;
  const trailingUrl = `${process.env.PUBLIC_URL}/PageImage/home/trailing.svg`;
  const logoUrl = `${process.env.PUBLIC_URL}/PageImage/home/logo.svg`;
  const b1Url = `${process.env.PUBLIC_URL}/PageImage/home/b1.svg`;
  const b2Url = `${process.env.PUBLIC_URL}/PageImage/home/b2.svg`;
  const b3Url = `${process.env.PUBLIC_URL}/PageImage/home/b3.svg`;
  const b4Url = `${process.env.PUBLIC_URL}/PageImage/home/b4.svg`;
  const b5Url = `${process.env.PUBLIC_URL}/PageImage/home/b5.svg`;
  const b6Url = `${process.env.PUBLIC_URL}/PageImage/home/b6.svg`;
  const b7Url = `${process.env.PUBLIC_URL}/PageImage/home/b7.svg`;
  const b8Url = `${process.env.PUBLIC_URL}/PageImage/home/b8.svg`;

  const imageNumbers = Array.from({ length: 9 }, (_, index) => index + 1);
  const containerRef = useRef(null);
  const containerRef2 = useRef(null);
  const containerRef3 = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const startDrag = (e) => {
    if (containerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };
  const stopDrag = () => {
    setIsDragging(false);
  };
  const onDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX); // 스크롤 속도 조정
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const startDrag2 = (e) => {
    if (containerRef2.current) {
      setIsDragging(true);
      setStartX(e.pageX - containerRef2.current.offsetLeft);
      setScrollLeft(containerRef2.current.scrollLeft);
    }
  };
  const stopDrag2 = () => {
    setIsDragging(false);
  };
  const onDrag2 = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef2.current.offsetLeft;
    const walk = (x - startX); // 스크롤 속도 조정
    containerRef2.current.scrollLeft = scrollLeft - walk;
  };

  const startDrag3 = (e) => {
    if (containerRef3.current) {
      setIsDragging(true);
      setStartX(e.pageX - containerRef3.current.offsetLeft);
      setScrollLeft(containerRef3.current.scrollLeft);
    }
  };
  const stopDrag3 = () => {
    setIsDragging(false);
  };
  const onDrag3 = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef3.current.offsetLeft;
    const walk = (x - startX); // 스크롤 속도 조정
    containerRef3.current.scrollLeft = scrollLeft - walk;
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
      setIsOpen(!isOpen);
  };

  const handleItemClick = (id) => {
    navigate(`/list/${id}`);
  };

  return (
    <div lang='ko'>
      <div className="mid">
        <div className="home-header">
          <div className="home-location">
            <button>
              <img src={locationUrl} alt="location" />
            </button>
            위치를 설정하세요.
            <button>
              <img src={arrowUrl} alt="arrow" />
            </button>
          </div>
          <div className="trailing">
            <button>
              <img src={trailingUrl} alt="trailing" />
            </button>
          </div>
        </div>
        <div className="home-container1"></div>
        <div className="home-container2"></div>
        <div 
          className="home-container3" 
          ref={containerRef}
          onMouseDown={startDrag}
          onMouseLeave={stopDrag}
          onMouseUp={stopDrag}
          onMouseMove={onDrag}
        >
          <div className="margin"></div>
          {imageNumbers.map((number) => (
            <div className="home-container3-img" key={number}>
              <div className="img-number">
                {number}/9
              </div>
            </div>
          ))}
        </div>
        
        <div className="category">
        <div className="text">카테고리</div>
        <div 
          className="button-grid"
          ref={containerRef2}
          onMouseDown={startDrag2}
          onMouseLeave={stopDrag2}
          onMouseUp={stopDrag2}
          onMouseMove={onDrag2}
        >
        <div className="button-grid-con">
          <div className="button-item" onClick={() => handleItemClick('beauty')}>
            <img src={b1Url} alt=""/>
          </div>
          <div className="button-item" onClick={() => handleItemClick(2)}>
            <img src={b2Url} alt=""/>
          </div>
          <div className="button-item" onClick={() => handleItemClick(3)}>
            <img src={b3Url} alt=""/>
          </div>
          <div className="button-item" onClick={() => handleItemClick(4)}>
            <img src={b4Url} alt=""/>
          </div>
        </div>
        <div className="button-grid-con">
          <div className="button-item" onClick={() => handleItemClick(5)}>
            <img src={b5Url} alt=""/>
          </div>
          <div className="button-item" onClick={() => handleItemClick(6)}>
            <img src={b6Url} alt=""/>
          </div>
          <div className="button-item" onClick={() => handleItemClick(7)}>
            <img src={b7Url} alt=""/>
          </div>
          <div className="button-item" onClick={() => handleItemClick(8)}>
            <img src={b8Url} alt=""/>
          </div>
        </div>
      </div>
      </div>
        <div 
          className="home-container4"
          ref={containerRef3}
          onMouseDown={startDrag3}
          onMouseLeave={stopDrag3}
          onMouseUp={stopDrag3}
          onMouseMove={onDrag3}
        >
          <div className="margin"></div>
          <div className="home-container4-img"></div>
          <div className="home-container4-img"></div>
          <div className="home-container4-img"></div>
        </div>
        <div className="tail-container">
          <div className="tail-item">
            <img src={logoUrl} alt=""/>
            <div className="tail-text">
              애견미용샵 ｜상품입점｜제휴문의｜상담문의
            </div>
            <div className="tail-number">
              070-4571-7580
            </div>
            <div className="tail-a">
              이용약관｜개인정보 처리방침
            </div>
            <div className={`tail-accordion ${isOpen ? 'open' : ''}`} onClick={toggleAccordion}>
                사업자 정보
                <img src={footArrowUrl} alt="arrow" />
            </div>
            <div className={`hidden-content ${isOpen ? 'open' : ''}`}>
              <div className="hidden-item">
                <div>대표</div>
                <div>사업자등록번호</div>
                <div>통신판매업</div>
                <div>주소</div>
                <div>이메일</div>
              </div>
              <div className="hidden-item2">
                <div>권도혁</div>
                <div>836-34-00928</div>
                <div>00000000</div>
                <div>경산북도 경산시 하양읍 대학리 13-13</div>
                <div>creamoff2021@naver.com</div>
              </div>
            </div>
            <div className="tail-co">
              @말꼬리 co Ltd. All rigths reserved
            </div>
          </div>
        </div>
      </div>
      <NButtonContainer />
    </div>
  );
};

export default MainPage;