import React, { useEffect, useState } from "react";
import NButtonContainer from "../Components/NavigatorBar/NButtonContainer";
// import List from './List';
import "../../CSS/notice.css";
import api from "../../Api";
import { useNavigate } from "react-router-dom";

const NoticePage = () => {
  const [isOpen, setIsOpen] = useState(false); // 아코디언 상태를 관리하기 위한 상태
  const navigate = useNavigate();

  const toggleAccordion = () => {
    setIsOpen(!isOpen); // 아코디언 열림/닫힘 상태 토글
  };
  const [lists, setLists] = useState([]);

  const arrowUrl = `${process.env.PUBLIC_URL}/images/list/arrow_fill_down.svg`;
  const searchUrl = `${process.env.PUBLIC_URL}/images/notice/search.svg`;

  useEffect(() => {
    const noticeList = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found.");
        }
        const response = await api.get("/api/customer/notice/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLists(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error("로그인 인증 실패:", error);
      }
    };
    noticeList();
  }, []);

  console.log(lists);
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
  return (
    <div className="notice_total">
      <div className="navigation">
        <div>
          <button>
            <img src={arrowButtonUrl} alt="" onClick={() => navigate(-1)} />
          </button>
        </div>
        알림장목록
        <div></div>
      </div>
      {/* <div className='header' lang='ko'>
                <div className='notice-header-bar'>
                    <input className='notice-header-search' placeholder="검색어를 입력하세요..." />
                    <img src={searchUrl} alt="" />
                </div>
                <div className={`notice-header ${isOpen ? 'open' : ''}`}>
                    <div className='notice-header-i'>
                        <div className='notice-header-item' onClick={toggleAccordion}>
                            시간 오름차 순
                            <button>
                                <img src={arrowUrl} alt='arrow' />
                            </button>
                        </div>
                    </div>
                    {isOpen && (
                        <div className='notice-header-i2'>
                            <div className='notice-header-item' onClick={toggleAccordion}>
                                시간 내림차 순
                            </div>
                        </div>
                    )}
                </div>
            </div> */}
      <div className={`notice-mid`}>
        {lists.map((list, index) => (
          <div className="notice-list-container" key={index}>
            <div className="text-container">
              <div className="list-title-container">
                <div className="list-title">{list.business_name}</div>
                <div className="notice-content">
                  {list.address_road}
                  {list.address_detail}
                </div>
                <div className="notice-content">{list.date}</div>
              </div>
            </div>
            <button
              className="notice-button"
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(`/notice/${list.beauty_notice_id}`, {
                  state: { date: list.date },
                })
              }
            >
              알림장 보기
            </button>
          </div>
        ))}
      </div>
      <NButtonContainer />
    </div>
  );
};

export default NoticePage;
