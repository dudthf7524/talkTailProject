import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RadioButton from './RadioButton';
import api from '../../Api';
import PetEditPage from './PetEditPage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPetData } from '../../redux/petSlice';

const PetDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // URL에서 펫 ID 가져오기
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_left.svg`;
    const defaultPetImgUrl = `${process.env.PUBLIC_URL}/PageImage/pet/pet_img_L.png`;
    const noteUrl = `${process.env.PUBLIC_URL}/PageImage/list/note_ic.svg`;
    const photoUrl = `${process.env.PUBLIC_URL}/PageImage/pet/photo.svg`;
    // const [petData, setPetData] = useState(null);

   
   
    const dispatch = useDispatch();

    const { petData, loading, error } = useSelector((state) => state.pets);
  
    useEffect(() => {
      dispatch(fetchPetData(id));
    }, [dispatch, id]);

    const [formData, setFormData] = useState({
        // 초기값 설정
    });
    useEffect(() => {
        if (petData) {
            console.log(petData)
            setFormData({
                gender: petData.pet_gender ? "남자" : "여자", 
            });
         

        }
    }, [petData]);
    

    


    // useEffect(() => {
    //     const fetchPetData = async () => {
    //         try {
    //             const token = localStorage.getItem('token');
    //             if (!token) {
    //                 throw new Error('No token found.');
    //             }
    //             const response = await api.get(`/api/pet/detail/${id}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //                 },
    //             });
    //             setPetData(response.data);
    //             // 성별 데이터 초기화
    //             setFormData({
    //                 ...formData,
    //                 gender: response.data.pet_gender === 1 ? '남자' : '여자',
    //             });
    //             console.log('펫 데이터:', response.data);
    //         } catch (error) {
    //             console.error('펫 데이터 가져오기 에러:', error);
    //         }
    //     };
    //     fetchPetData();
    // }, [id]);
  
    const goBack = () => {
        navigate(-1);
    };

    const handleEdit = () => {
        navigate(`/pet-edit/${id}`);
    };

    if (!petData) {
        return <div>Loading...</div>;
    }
  
    return (
        <div lang='ko'>
            <div className='r-mid'>
                <div className='navigation'>
                    <button onClick={goBack}>
                        <img src={arrowButtonUrl} alt='뒤로가기' />
                    </button>
                    펫 등록정보
                    <div>
                        <button onClick={handleEdit}>
                            <img src={noteUrl} alt='' />
                        </button>
                    </div>
                </div>
                <div className='re-mid'>
                    <div className='PetRegistration-container'>
                        <input
                            type="text"
                            className="textbox"
                            value={petData.pet_name || ''}
                            readOnly
                        />
                    </div>
                    <div className='PetRegistration-img-container'>
                        <div className='PetRegistration-content'>
                            <div className='upload-img'>
                                <img src={petData.petimage || defaultPetImgUrl} alt='펫 이미지' />
                            </div>
                            <div className='photo'>
                                <label htmlFor="imageUpload">
                                    <img src={photoUrl} alt='' style={{ cursor: 'pointer' }} />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='PetRegistration-container2'>
                        <p>종류</p>
                        <div className='PetRegistration-container'>
                            <input
                                type="text"
                                className="textbox-gray"
                                value={petData.pet_species || ''}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='PetRegistration-container2'>
                        <p>품종</p>
                        <div className='PetRegistration-container'>
                        <input
                            type="text"
                            className="textbox-gray"
                            value={petData.pet_breed || ''}
                            readOnly
                        />
                        </div>
                    </div>
                    <div className='PetRegistration-container2'>
                        <p>태어난 날</p>
                        <div className='PetRegistration-container'>
                            <input
                                type="text"
                                className="textbox-gray"
                                value={petData.pet_birth || ''}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='PetRegistration-container2'>
                        <p>몸무게</p>
                        <div className='PetRegistration-container'>
                            <input
                                type="text"
                                className="textbox-gray"
                                value={petData.pet_weight || ''}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className='PetRegistration-container2'>
                        <p>성별은</p>
                        <RadioButton
                            options={[
                                { label: '남자', value: '남자' },
                                { label: '여자', value: '여자' },
                            ]}
                            selectedOption={formData.gender}
                            onSelect={() => {}} // 선택 불가능하도록 콜백 제거
                            disabled // 비활성화하여 선택된 값 고정
                        />
                    </div>
                    <div className='PetRegistration-container2'>
                        <p>중성화 여부</p>
                        <RadioButton
                            options={[
                                { label: 'O', value: 'O' },
                                { label: 'X', value: 'X' },
                            ]}
                            selectedOption={petData.pet_neuter}
                            onSelect={() => {}} // 선택 불가능하도록 콜백 제거
                            disabled // 비활성화하여 선택된 값 고정
                        />
                    </div>
                
                    <div className='PetRegistration-container2'>
                        <p>기타 추가 사항</p>
                        <input
                            type="text"
                            className="textbox-gray2"
                            value={petData.pet_etc || '없음'}
                            readOnly
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PetDetail;
