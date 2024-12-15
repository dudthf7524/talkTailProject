import React, { useEffect, useState } from 'react';
import NButtonContainer from '../Components/NavigatorBar/NButtonContainer';
import List from './List';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchBusinesses from './useFetchBusinesses';

import { useDispatch, useSelector } from 'react-redux';
import { fetchBeautyList } from '../../redux/beautyList';
import axios from 'axios';
import api from '../../Api';

const ListPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 id 매개변수 가져오기
  const [listData, setListData] = useState([]);
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_left.svg`;
  const arrowUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_fill_down.svg`;
  const mapUrl = `${process.env.PUBLIC_URL}/PageImage/list/map.svg`;
  const trailingUrl = `${process.env.PUBLIC_URL}/PageImage/home/trailing.svg`;
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가
  const [modalMessage, setModalMessage] = useState(''); // 모달 메시지
  const closeModal = () => setShowModal(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:8383/user/auth', {
        headers: {
          Authorization: `Bearer ${token}`,  // Authorization 헤더에 토큰 추가
        }
      })
        .then(response => {
          console.log(response.data);  // 서버에서 전달하는 사용자 정보 출력
          setUser(response.data)
        })
        .catch(error => {
          console.error('에러 발생:', error);
        });
    }
  }, []);
  // 뒤로 가기
  const goBack = () => {
    navigate(-1);
  };

  const handleItemClick = (id) => {
    navigate(`/business/detail/${id}`);
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

  // useEffect(() => {
  //   const AuthorizeUser = async () => {
  //     console.log('Fetching user...');


  //     try {
  //       const authorityResponse = await api.get('/api/user/authority', {
  //         headers: {
  //           'Business-Registration-Number': userData.business_registration_number,
  //         },
  //       });
  //       console.log('User authority data:', authorityResponse.data);
  //       setLists(authorityResponse.data);
  //     } catch (authorityError) {
  //       console.error('권한 조회 실패:', authorityError);
  //     }
  //   }
  //   AuthorizeUser();
  // }, []);


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

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;



  const userAuthorityRequestButton = async (business_registration_number) => {
    console.log(business_registration_number);
    console.log(user.id);
    const platform_id = user.id;

    try {
      const response = await api.post('/api/user/authority/request', {
        business_registration_number,
        platform_id,
      });
      console.log('Upload successful', response.data);
      // navigate(`/`);
    } catch (error) {
      console.error('Error occurred:', error);
    }


  }

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
                  onClick={() => handleImageClick(list.business_registration_number)} />
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
                  <div className="list-content">{list.address_road}{list.business_registration_number} {list.address_detail}</div>
                </div>
                <div className='list-title-container'>
                  <button onClick={() => {
                    userAuthorityRequestButton(list.business_registration_number)
                  }}>권한요청</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}
      <NButtonContainer />
    </div>
  );
};

export default ListPage;