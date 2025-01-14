import React, { useEffect, useState } from 'react';
import NButtonContainer from '../Components/NavigatorBar/NButtonContainer';

import { useNavigate, useParams } from 'react-router-dom';


import { useDispatch, useSelector } from 'react-redux';
import { fetchBeautyList } from '../../redux/beautyList';
import axios from 'axios';
import api from '../../Api';
import AuthorityReauest from '../Components/AuthorityReauest';
import '../../CSS/reservationModal.css'

const ListPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 id 매개변수 가져오기
  const [listData, setListData] = useState([]);
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_left.svg`;
  const arrowUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_fill_down.svg`;
  const mapUrl = `${process.env.PUBLIC_URL}/PageImage/list/map.svg`;
  const trailingUrl = `${process.env.PUBLIC_URL}/PageImage/home/trailing.svg`;
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가\
  const [authorityRequestModal, setAuthorityRequestModal] = useState(false); // 모달 상태 추가
  const [modalMessage, setModalMessage] = useState(''); // 모달 메시지

  const [authorityData, setAuthorityData] = useState([]);


  const [selectedBusiness, setSelectedBusiness] = useState(); // 선택된 비즈니스 정보



  const handleAuthorityRequestClick = (business_registration_number, business_owner_phone) => {
    console.log(business_registration_number)
    console.log(business_owner_phone)
    setSelectedBusiness({ business_registration_number: business_registration_number, business_owner_phone: business_owner_phone });// 선택된 비즈니스 등록 번호 저장
    console.log(selectedBusiness)
    setModalMessage('권한 요청을 하시겠습니까?'); // 모달 메시지 설정
    setShowModal(true); // 모달 띄우기
  };
  const handleConfirmAuthorityRequest = () => {
    if (selectedBusiness) {
      userAuthorityRequestButton(selectedBusiness); // 권한 요청 함수 호출
    }
    setShowModal(false); // 모달 닫기
  };

  // 4. 모달 닫기 버튼 클릭 시 모달 닫기
  const closeModal = () => {
    setAuthorityRequestModal(false)
  };

  useEffect(() => {
    const AuthorizeUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found.');
        }
        const response = await api.get('/api/user/authority/available', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        console.log('User authority data:', response.data);
        setAuthorityData(response.data);
      } catch (authorityError) {
        console.error('권한 조회 실패:', authorityError);
      }
    }
    AuthorizeUser();
  }, []);
  // 뒤로 가기
  const goBack = () => {
    navigate(-1);
  };

  const handleItemClick = async (id, business_registration_number) => {
    console.log(business_registration_number)
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found.');
      }

      const response = await api.post(`/api/user/authority/defense`, { business_registration_number }, {
        headers: {
          Authorization: `Bearer ${token}`
        }


      })
      console.log("response.data")
      console.log(response.data)
      console.log("response.data")


      if (response.data == null) {

        setModalMessage('권한 요청 완료 후 이용 가능합니다.')
        setAuthorityRequestModal(true)
      }else if (response.data.authority_state === '거절') {
        setModalMessage('권한 요청 완료 후 이용 가능합니다.')
        setAuthorityRequestModal(true)
      }
      else if (response.data.authority_state === '대기') {
        setModalMessage('권한 요청 대기 중입니다.')
        setAuthorityRequestModal(true)
      }
      else if (response.data.authority_state === '완료') {
        navigate(`/business/detail/${id}`);
      }
    } catch (error) {
      console.log('권한 방어 에러', error)
      return
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // 검색어 상태 업데이트
    // 검색어가 바뀔 때마다 콘솔에 출력
  };

  const filterListData = listData.filter((list) =>
    list.business_name.toLowerCase().includes(searchTerm.toLowerCase()) // 대소문자 구분 없이 검색
  );

  const dispatch = useDispatch();
  const { beautyListData, loading, error } = useSelector((state) => state.beautyList || {});

  useEffect(() => {
    console.log('dispatching fetchBeautyList...');
    dispatch(fetchBeautyList());
  }, [dispatch]);

  useEffect(() => {
    if (beautyListData) {
      setListData(beautyListData)
    }
  }, [beautyListData]);




  const fetchBusinessAuthority = async (business_registration_number) => {
    console.log('Fetching authority for:', business_registration_number);

    try {
      const response = await api.get('/api/user/authority', {
        headers: {
          'Business-Registration-Number': business_registration_number,
        },
      });
      console.log('User authority data:', response.data);
      // 데이터 처리 추가
    } catch (authorityError) {
      console.error('권한 조회 실패:', authorityError);
    }
  };

  const handleImageClick = (business_registration_number) => {
    fetchBusinessAuthority(business_registration_number); // 클릭된 이미지의 사업자 번호를 사용
  };




  const userAuthorityRequestButton = async (selectedBusiness) => {

    console.log(selectedBusiness)
    const business_registration_number = selectedBusiness.business_registration_number;
    const business_owner_phone = selectedBusiness.business_owner_phone;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found.');
      }


      const response = await api.post('/api/user/authority/request', {
        business_registration_number,
        business_owner_phone,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log('Upload successful', response.data);
      window.location.href = '/list/beauty';
    } catch (error) {
      console.error('Error occurred:', error);
    }


  }
  const getAuthorityStatus = (business_registration_number) => {
    const authority = authorityData.find(item => item.business_registration_number === business_registration_number);
    console.log(authority)

    

    return authority ? authority.authority_state : null;
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <div lang='ko'>
      <div className='navigation'>
        <button>
          <img src={arrowButtonUrl} alt='' onClick={goBack} />
        </button>
        미용
        <div></div>
      </div>
      <div className={`list-header`}>
        <div className='list-header-i'>
          <input
            type='text'
            className='beautyListSearchBox'
            placeholder='검색어를 입력해주세요.'
            value={searchTerm} // 입력 값은 상태로 관리
            onChange={handleSearchChange} // 입력 값 변경 시 onChange 이벤트 발생
          />
          <button>
            <img src={trailingUrl} alt="trailing" />
          </button>

        </div>
      </div>
      <div className="list-mid-h">
      </div>
      <div className="list-mid-h">
        <div className='list-mid'>
          {/* beautyListData 배열을 순회하여 렌더링 */}
          {filterListData && filterListData.map((list) => (
            <div className="list-list-container" key={list.business_information_id}>
              <div className="list-image-container">
                {/* 이미지가 있는 경우에만 렌더링 */}
                {list.business_main_image ? (
                  <img src={list.business_main_image}
                    alt={list.business_name}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleItemClick(list.business_information_id, list.business_registration_number)} />
                ) : (
                  <div>No Image Available</div> // 이미지가 없으면 대체 텍스트
                )}
              </div>
              <div className="text-container" >
                <div className="list-title-container">
                  <div className="list-title">{list.business_name}</div>
                  <div className="list-tag-container">
                    <div className='list-tag'>
                      소형견
                    </div>
                    <div className='list-tag'>
                      대형견
                    </div>
                    <div className='list-tag'>
                      CCTV
                    </div>
                  </div>
                  <div className="list-content">{list.address_road} {list.address_detail}</div>
                  <div className='list-title-container'>
                  {/* 권한 상태에 따라 버튼 텍스트 변경 */}
                  {getAuthorityStatus(list.business_registration_number) === '완료' ? (
                    <button disabled>권한요청이 완료되었습니다.</button>
                  ) : getAuthorityStatus(list.business_registration_number) === '대기' ? (
                    <div className='authority available'>
                      <span style={{ color: "red" }}>권한 요청 중입니다.</span><span> (권한 승인 대기중...)</span>
                    </div>

                  ) : getAuthorityStatus(list.business_registration_number) === '거절' ? (
                    <span style={{ color: "red" }}>권한요청이 거절되었습니다.</span>

                  ) : (
                    <button onClick={() => handleAuthorityRequestClick(list.business_registration_number, list.business_owner_phone)}>
                      권한요청
                    </button>
                  )}
                </div>
                </div>
               
              </div>
            </div>
          ))}
        </div>
        {authorityRequestModal && (
          <AuthorityReauest massage={modalMessage} closeModal={closeModal}>

          </AuthorityReauest>
        )}
      </div>
      {showModal && (
        <div className="modal-overlay" >
          <div className="modal-content1">
            <p>{modalMessage}</p>
            <button onClick={closeModal}>닫기</button>
            <button onClick={handleConfirmAuthorityRequest}>확인</button>
          </div>
        </div>
      )}



      <NButtonContainer />
    </div>
  );
};

export default ListPage;