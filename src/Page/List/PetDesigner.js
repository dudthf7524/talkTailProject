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

  const designerName = useSelector((state) => state.reservationData); // Redux 상태 가져오기
  console.log("Selected Designer Name:", designerName); // 리덕스 상태 출력

  const business_registration_number = designerName.businessInfo.business_registration_number;

  if (business_registration_number === null) {
    navigate(-1)
  }

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
        const response = await api.get(`/api/designer/list/${business_registration_number}`, {
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
      <div className="pet_list_box">
        {
          Array.isArray(designers) && designers.map((designer, index) => (
            <div
              key={index}
              className='pet_list'
            >
              <div className='desinger_ngi_img'>
                <img style={{width: "100px", height: "100px" }} src={`${process.env.PUBLIC_URL}/profile/${designer.business_desinger_profile}`} ></img>
                <div className='desinger_ngi'>
                  <div className='desinger_ng'>
                    <div className='desinger_name'>{designer.business_desinger_name}</div>
                    <div className='desinger_g'>
                      <div className='desinger_grade'>{designer.business_desinger_grade}</div>
                    </div>

                  </div>
                  <div className='desinger_introduce'>{designer.business_desinger_introduce}</div>
                </div>
              </div>
              <div className='pet_list_button'>
                <button
                  onClick={() => handleClick(designer.business_desinger_id, designer.business_desinger_name)}
                >선택하기</button>
              </div>


            </div>
          ))
        }

      </div>
      <NButtonContainer />
    </div>
  );
};

export default PetDesigner;