import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../Api";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";

const NoticeDetail = () => {
  const location = useLocation();
  const date = location.state?.date;
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 이벤트 ID 가져오기
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
  const [list, setList] = useState();

  console.log(id);

  useEffect(() => {
    const noticeDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found.");
        }
        const response = await api.get(`/api/customer/notice/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setList(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    noticeDetail();
  }, []);

  console.log(list);

  const [selectedOptions, setSelectedOptions] = useState({
    notice_skin: '', // list가 없으면 기본값으로 빈 문자열
    notice_ear: '',
    notice_eye: '',
    notice_sole: '',
    notice_claw: '',
    notice_analSac: '',
    notice_hairTangling: '',
  });
  useEffect(() => {
    if (list) {
      // list가 업데이트되면 selectedOptions을 업데이트
      setSelectedOptions({
        notice_skin: list.notice_skin || '',
        notice_ear: list.notice_ear || '',
        notice_eye: list.notice_eye || '',
        notice_sole: list.notice_sole || '',
        notice_claw: list.notice_claw || '',
        notice_analSac: list.notice_analSac || '',
        notice_hairTangling: list.notice_hairTangling || '',
      });
    }
  }, [list]); // list가 업데이트되면 실행
  const handleCheckboxChange = (category, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: value,
    }));
  };
  const calculateAge = (birthDate) => {
    if (!birthDate) return null; // 생년월일이 없을 경우 처리
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    // 생일이 아직 지나지 않았으면 나이를 하나 줄임
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age;
  };

  const goBack = () => {
    navigate(-1); // 뒤로 가기
  };

  const handleClickReview = (id) => {
    navigate(`/events/${id}/review`);
  };

  if (!list) {
    return <div>로딩 중....</div>;
  }

  return (
    <div lang="ko">
      <div className="mid">
        <div className="navigation">
          <button>
            <img src={arrowButtonUrl} alt="" onClick={goBack} />
          </button>
          알림장 상세보기
          <div></div>
        </div>
        <div className="review-mid">
          <div className="view-head">
            <div className="view-head-textbox">
              <h1>알림장</h1>
              <p>{dayjs(date).format("YYYY년 M월DD일 (ddd)")}</p>
            </div>
          </div>
          <div className="view-pet">
            {list.pet_name}
            <p>
              {list.pet_breed}/{list.pet_weight}kg/{list.pet_name}/
              {calculateAge(list.pet_birth)}살
            </p>
          </div>
          <div className="view-contents-style">
            <div className="view-contents-title">
              <h1>스타일</h1>
            </div>
            <div className="view-contents-option">
              <p>{list.notice_style}</p>
            </div>
          </div>
          <div className="view-contents-style">
            <div className="view-contents-title">
              <h1>피부</h1>
            </div>
            <div className='notice-checkboxes'>
              <label>
                <input
                  type='radio'
                  name='notice_skin'
                  value='good'
                  checked={selectedOptions.notice_skin === '좋음'}
                  onChange={() => handleCheckboxChange('notice_skin', '좋음')}
                />
                좋음
              </label>
              <label>
                <input
                  type='radio'
                  name='notice_skin'
                  value='dry'
                  checked={selectedOptions.notice_skin === '건조'}
                  onChange={() => handleCheckboxChange('notice_skin', '건조')}
                />
                건조
              </label>
              <label>
                <input
                  type='radio'
                  name='notice_skin'
                  value='sensitive'
                  checked={selectedOptions.notice_skin === '민감'}
                  onChange={() => handleCheckboxChange('notice_skin', '민감')}
                />
                민감
              </label>
            </div>
          </div>
          <div className="view-contents-style">
            <div className="view-contents-title">
              <h1>귀</h1>
            </div>
            <div className='notice-checkboxes'>
              <label>
                <input
                  type='radio'
                  name='notice_ear'
                  value='clear'
                  checked={selectedOptions.notice_ear === '깨끗함'}
                  onChange={() => handleCheckboxChange('notice_ear', '깨끗함')}
                />
                깨끗함
              </label>
              <label>
                <input
                  type='radio'
                  name='notice_ear'
                  value='yellow-ear'
                  checked={selectedOptions.notice_ear === '노란귀지'}
                  onChange={() => handleCheckboxChange('notice_ear', '노란귀지')}
                />
                노란귀지
              </label>
              <label>
                <input
                  type='radio'
                  name='notice_ear'
                  value='brown-ear'
                  checked={selectedOptions.notice_ear === '갈색귀지'}
                  onChange={() => handleCheckboxChange('notice_ear', '갈색귀지')}
                />
                갈색귀지
              </label>
            </div>
          </div>
          <div className="view-contents-style">
            <div className="view-contents-title">
              <h1>눈</h1>
            </div>
            <div className='notice-checkboxes'>
              <label>
                <input
                  type='radio'
                  name='notice_eye'
                  value='clear'
                  checked={selectedOptions.notice_eye === '깨끗함'}
                  onChange={() => handleCheckboxChange('notice_eye', '깨끗함')}
                />
                깨끗함
              </label>
              <label>
                <input
                  type='radio'
                  name='notice_eye'
                  value='eyelid'
                  checked={selectedOptions.notice_eye === '눈꼽'}
                  onChange={() => handleCheckboxChange('notice_eye', '눈꼽')}
                />
                눈꼽
              </label>
              <label>
                <input
                  type='radio'
                  name='notice_eye'
                  value='congestion'
                  checked={selectedOptions.notice_eye === '충혈'}
                  onChange={() => handleCheckboxChange('notice_eye', '충혈')}
                />
                충혈
              </label>
            </div>
          </div>
          <div className="view-contents-style">
            <div className="view-contents-title">
              <h1>발바닥</h1>
            </div>
            <div className='notice-checkboxes'>
              <label>
                <input
                  type='radio'
                  name='notice_sole'
                  value='good'
                  checked={selectedOptions.notice_sole === '좋음'}
                  onChange={() => handleCheckboxChange('notice_sole', '좋음')}
                />
                좋음
              </label>
              <label>
                <input
                  type='radio'
                  name='notice_sole'
                  value='eczema'
                  checked={selectedOptions.notice_sole === '습진'}
                  onChange={() => handleCheckboxChange('notice_sole', '습진')}
                />
                습진
              </label>
              <label>
                <input
                  type='radio'
                  name='notice_sole'
                  value='dry'
                  checked={selectedOptions.notice_sole === '건조'}
                  onChange={() => handleCheckboxChange('notice_sole', '건조')}
                />
                건조
              </label>
            </div>
          </div>
          <div className="view-contents-style">
            <div className="view-contents-title">
              <h1>발톱</h1>
            </div>
            <div className='notice-checkboxes'>
              <label>
                <input
                  type='radio'
                  name='notice_claw'
                  value='good'
                  checked={selectedOptions.notice_claw === '적당함'}
                  onChange={() => handleCheckboxChange('notice_claw', '적당함')}
                />
                적당함
              </label>
              <label>
                <input
                  type='radio'
                  name='notice_claw'
                  value='short'
                  checked={selectedOptions.notice_claw === '짧음'}
                  onChange={() => handleCheckboxChange('notice_claw', '짧음')}
                />
                짧음
              </label>
              <label>
                <input
                  type='radio'
                  name='notice_claw'
                  value='management'
                  checked={selectedOptions.notice_claw === '관리필요'}
                  onChange={() => handleCheckboxChange('notice_claw', '관리필요')}
                />
                관리필요
              </label>
            </div>
          </div>
          <div className="view-contents-style">
            <div className="view-contents-title">
              <h1>항문낭</h1>
            </div>
            <div className='notice-checkboxes'>
              <label>
                <input
                  type='radio'
                  name='notice_analSac'
                  value='good'
                  checked={selectedOptions.notice_analSac === '적당함'}
                  onChange={() => handleCheckboxChange('notice_analSac', '적당함')}
                />
                적당함
              </label>
              <label>
                <input
                  type='radio'
                  name='notice_analSac'
                  value='many'
                  checked={selectedOptions.notice_analSac === '많음'}
                  onChange={() => handleCheckboxChange('notice_analSac', '많음')}
                />
                많음
              </label>
              <label>
                <input
                  type='radio'
                  name='notice_analSac'
                  value='none'
                  checked={selectedOptions.notice_analSac === '안나옴'}
                  onChange={() => handleCheckboxChange('notice_analSac', '안나옴')}
                />
                안나옴
              </label>
            </div>
          </div>
          <div className="view-contents-style">
            <div className="view-contents-title">
              <h1>털엉킴</h1>
            </div>
            <div className='notice-checkboxes'>
              <label>
                <input
                  type='radio'
                  name='notice_hairTangling'
                  value='yes'
                  checked={selectedOptions.notice_hairTangling === '유'}
                  onChange={() => handleCheckboxChange('notice_hairTangling', '유')}
                />
                유
              </label>
              <label>
                <input
                  type='radio'
                  name='notice_hairTangling'
                  value='no'
                  checked={selectedOptions.notice_hairTangling === '무'}
                  onChange={() => handleCheckboxChange('notice_hairTangling', '무')}
                />
                무
              </label>
            </div>
          </div>
          <div className="view-contents-style">
            <div className="view-contents-title">
              <h1>특이사항</h1>
            </div>
            <div className="view-contents-option">
              <p>{list.notice_etc}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="Nbutton"
        onClick={() => navigate("/notice")}
        style={{ cursor: "pointer" }}
      >
        알림장 목록
      </div>
    </div>
  );
};

export default NoticeDetail;
