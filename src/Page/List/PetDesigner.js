import React, { useEffect, useState } from 'react';
import NButtonContainer from '../Components/NavigatorBar/NButtonContainer';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../Api';
import { setDesignerName } from '../../redux/reservationData';
import { useDispatch, useSelector } from 'react-redux';

const PetDesigner = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 id 매개변수 가져오기
  console.log(id)
  const dispatch = useDispatch();

  const designerName = useSelector((state) => state.reservationData.designerName); // Redux 상태 가져오기
  console.log("Selected Designer Name:", designerName); // 리덕스 상태 출력

  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const arrowButtonUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_left.svg`;
  const arrowUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_fill_down.svg`;
  const mapUrl = `${process.env.PUBLIC_URL}/PageImage/list/map.svg`;

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

  const [designers, setDesigners] = useState({})
  
  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found.');
        }
        const response = await api.get(`/api/designer/list/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setDesigners(response.data);
        console.log('Business fetched:', response.data);
      } catch (error) {
        console.error('Error fetching business:', error);
      }
    };
    fetchBusiness();
  }, [id]);
  
  console.log(designers)
  const handleClick = (id, name) => {
    console.log(id)
    console.log(name)
    dispatch(setDesignerName(id));
    navigate(`/selected/date/${id}`);
  };
  return (
    <div lang='ko'>
      <div className='navigation'>
        <button>
          <img src={arrowButtonUrl} alt='' onClick={goBack} />
        </button>
        디자이너 선택
        <div></div>
      </div>
      <div className={`list-header ${isDropdownOpen ? 'open' : ''}`}>
        <div className='list-header-i'>
          <div className='list-header-item' onClick={toggleDropdown}>
            거리 순
            <button>
              <img src={arrowUrl} alt='arrow' />
            </button>
          </div>
          <button>
            <img src={mapUrl} alt='map' onClick={() => handleItemClick(id)} />
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
        {
          Array.isArray(designers) && designers.map((designer, index) => (
            <div
              key={index} 
              className='list-list-container'
              onClick={()=> handleClick(designer.business_desinger_id, designer.business_desinger_name)}
              style={{ cursor: 'pointer' }}>
              <div className='list-title'>{designer.business_desinger_name}</div>
              <div className='list-content'>{designer.business_desinger_introduce}</div>
            </div>
          ))
        }

      </div>
      <NButtonContainer />
    </div>
  );
};

export default PetDesigner;