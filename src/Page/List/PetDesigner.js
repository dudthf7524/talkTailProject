import React from 'react';
import NButtonContainer from '../Components/NavigatorBar/NButtonContainer';
import List from './List';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchBusinesses from './useFetchBusinesses';

const PetDesigner = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 id 매개변수 가져오기

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/list/arrow_left.svg`;
  const arrowUrl = `${process.env.PUBLIC_URL}/images/list/arrow_fill_down.svg`;
  const mapUrl = `${process.env.PUBLIC_URL}/images/list/map.svg`;

  // 드롭다운 토글
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 뒤로 가기
  const goBack = () => {
    navigate(-1);
  };

  const handleItemClick = (id) => {
    navigate(`/list-map/${id}`);
  };

  

  return (
    <div lang='ko'>
      <div className='navigation'>
        <button>
          <img src={arrowButtonUrl} alt='' onClick={goBack}/>
        </button>
        디자이너 선택
        <div></div>
      </div>
      <div className={`list-header ${isDropdownOpen ? 'open' : ''}`}>
        <div className='list-header-i'>
          <div className='list-header-item' onClick={toggleDropdown}>
            거리 순
            <button>
              <img src={arrowUrl} alt='arrow'/>
            </button>
          </div>
          <button>
            <img src={mapUrl} alt='map' onClick={() => handleItemClick(id)}/>
          </button>
        </div>
        {isDropdownOpen && (
          <div className='dropdown-menu'>
            <div className='dropdown-item'>평점 오름차 순</div>
            <div className='dropdown-item'>평점 내림차 순</div>
            <div className='dropdown-item'>가격 오름차 순</div>
            <div className='dropdown-item'>가격 내림차 순</div>
            <div className='dropdown-item'>쌓인 후기 오름차 순</div>
            <div className='dropdown-item'>쌓인 후기 내림차 순</div>
          </div>
        )}
      </div>
      <div className="list-mid-h">
        sssss
       
      </div>
      <NButtonContainer />
    </div>
  );
};

export default PetDesigner;