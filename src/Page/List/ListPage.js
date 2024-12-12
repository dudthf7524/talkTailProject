import React, { useEffect, useState } from 'react';
import NButtonContainer from '../Components/NavigatorBar/NButtonContainer';
import List from './List';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchBusinesses from './useFetchBusinesses';

import { useDispatch, useSelector } from 'react-redux';
import { fetchBeautyList } from '../../redux/beautyList';

const ListPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 id 매개변수 가져오기
  const [listData, setListData] = useState([]);
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_left.svg`;
  const arrowUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_fill_down.svg`;
  const mapUrl = `${process.env.PUBLIC_URL}/PageImage/list/map.svg`;
  const trailingUrl = `${process.env.PUBLIC_URL}/PageImage/home/trailing.svg`;
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가

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

  const filteredEvents = listData.filter((list) =>
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

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  
  const aaa = () => {
    alert('aaa')
    navigate(`/`);
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
          {filteredEvents && filteredEvents.map((event) => (
            <div className="list-list-container" key={event.business_information_id}>
              <div className="list-image-container">
                {/* 이미지가 있는 경우에만 렌더링 */}
                {event.business_main_image ? (
                  <img src={event.business_main_image} alt={event.business_name} style={{ cursor: 'pointer' }} onClick={() => handleItemClick(event.business_information_id)} />
                ) : (
                  <div>No Image Available</div> // 이미지가 없으면 대체 텍스트
                )}
              </div>
              <div className="text-container" >
                <div className="list-title-container">
                  <div className="list-title">{event.business_name}</div>
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
                  <div className="list-content">{event.address_road} {event.address_detail}</div>
                </div>
                <div className='list-title-container'>
                  <button onClick={() => {
                    aaa()
                  }}>권한요청</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <NButtonContainer />
    </div>
  );
};

export default ListPage;