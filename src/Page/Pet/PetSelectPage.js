import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PetInfo from './PetInfo';
import { useDispatch, useSelector } from 'react-redux';
import { setPetId } from '../../redux/reservationData';

const PetSelectPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedPet, setSelectedPet] = useState(null);
    const [showWarning, setShowWarning] = useState(false);
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_left.svg`;
    const dispatch = useDispatch();
    const designerName = useSelector((state) => state.reservationData); // Redux 상태 가져오기
    console.log("Selected Designer Name:", designerName); // 리덕스 상태 출력
    const goBack = () => {
        navigate(-1);
    };

    const handleSelectPet = (pet) => {

        setSelectedPet(pet);
        console.log(pet.pet_id)
        const petId = pet.pet_id;
        
        dispatch(setPetId(petId));
        setShowWarning(false); // 펫을 선택할 때 경고 메시지 숨김
    };

    const handleNext = (id) => {
        if (selectedPet) {
            console.log("Selected Designer Name:", designerName); // 리덕스 상태 출력
            navigate(`/reservation-request/${id}`, { state: { selectedPet } });
        } else {
            setShowWarning(true); // 선택된 펫이 없으면 경고 메시지 표시
            setTimeout(() => {
                setShowWarning(false);
            }, 1000); // 1초 후에 경고 메시지 숨김
        }
    };

    return (
        <div lang='ko'>
            <div className='navigation'>
                <button onClick={goBack}>
                    <img src={arrowButtonUrl} alt='뒤로가기' />
                </button>
                예약 펫 선택
                <div></div>
            </div>
            <PetInfo isSelectable={true} onSelectPet={handleSelectPet} fileName={"select"} />
            {showWarning && <p className='warning'>펫을 선택해주세요.</p>}
            <div className='Nbutton' onClick={() => handleNext(id)}>다음</div>
        </div>
    );
};

export default PetSelectPage;