import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Checkbox from './CheckboxGroup.js';
import '../styles/reservation.css';

const ReservationRequestPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedPet } = location.state || {};
    const [reviewText, setReviewText] = useState(""); // 리뷰 텍스트 상태 관리
    const textareaRef = useRef(null); // textarea 참조를 위한 ref

    const handleCautionsChange = (e) => {
        setReviewText(e.target.value);
        adjustTextareaHeight(); // 텍스트가 변경될 때 높이 조정
    };

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // 높이를 자동으로 설정
            textarea.style.height = `${textarea.scrollHeight}px`; // 스크롤 높이만큼 설정
        }
    };

    useEffect(() => {
        adjustTextareaHeight(); // 컴포넌트가 마운트될 때 초기 높이 조정
    }, [reviewText]);

    const initialCheckboxes = [
        { label: '전체미용', name: 'overall beauty' },
        { label: '부분미용', name: 'partial beauty' },
        { label: '스포팅', name: 'spotting' },
        { label: '가위컷', name: 'scissors cut' },
        { label: '썸머컷', name: 'summer cut' },
        { label: '주문사항', name: 'order1' },
        { label: '주문사항', name: 'order2' },
        { label: '주문사항', name: 'order3' },
    ];

    const secondCheckboxes = [
        { label: '목욕', name: 'bath' },
        { label: '위생', name: 'hygiene' },
    ];

    const thirdCheckboxes = [
        { label: '피부병', name: 'skin disease' },
        { label: '심장질환', name: 'heart disease' },
        { label: '마킹', name: 'marking' },
        { label: '마운팅', name: 'mounting' },
        { label: '슬개골 탈구', name: 'patellar dislocation' },
    ];

    const [checkboxState, setCheckboxState] = useState(
        initialCheckboxes.reduce((acc, checkbox) => {
            acc[checkbox.name] = false;
            return acc;
        }, {})
    );

    const [checkboxState2, setCheckboxState2] = useState(
        secondCheckboxes.reduce((acc, checkbox) => {
            acc[checkbox.name] = false;
            return acc;
        }, {})
    );

    const [checkboxState3, setCheckboxState3] = useState(
        thirdCheckboxes.reduce((acc, checkbox) => {
            acc[checkbox.name] = false;
            return acc;
        }, {})
    );

    const [cautions, setCautions] = useState('');

    const goBack = () => {
        navigate(-1);
    };

    // 체크박스 변경 핸들러
    const handleCheckboxChange = (name, checked) => {
        setCheckboxState(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleCheckboxChange2 = (name, checked) => {
        setCheckboxState2(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleCheckboxChange3 = (name, checked) => {
        setCheckboxState3(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    // 나이 계산 함수
    const calculateAge = (birthDate) => {
        const birth = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        // 생일이 지나지 않았으면 나이에서 1살 뺌
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    };

    return (
        <div lang='ko'>
            <div className='navigation'>
                <button onClick={goBack}>
                    <img src={`${process.env.PUBLIC_URL}/images/list/arrow_left.svg`} alt='뒤로가기' />
                </button>
                예약신청서
                <div></div>
            </div>
            <div className='reservation-mid'>
                <div className='reservation-head'>
                    한라마운틴미용실
                </div>
                <div className='view-pet'>
                    {selectedPet.pet_name}
                    <p>{selectedPet.breedName}/{selectedPet.pet_weight}kg/{selectedPet.pet_gender ? '남' : '여'}/{calculateAge(selectedPet.pet_birth)}살</p>
                </div>
                <div className='blank'></div>
                <Checkbox groupName="스타일" checkboxes={initialCheckboxes} checkboxState={checkboxState} onChange={handleCheckboxChange} />
                <Checkbox groupName="추가 사항" checkboxes={secondCheckboxes} checkboxState={checkboxState2} onChange={handleCheckboxChange2} />
                <Checkbox groupName="특이사항" checkboxes={thirdCheckboxes} checkboxState={checkboxState3} onChange={handleCheckboxChange3} />
                <div className='reservation-contents'>
                    <h1>주의사항</h1>
                    <div className='reservation-contents-text'>
                        <textarea
                            ref={textareaRef}
                            value={reviewText}
                            className='cautions-textarea'
                            placeholder='주의해야 할 사항을 입력하세요...'
                            onChange={handleCautionsChange}
                        />
                    </div>
                </div>
            </div>
            <div className='payment-container'>
                <div className='payment'>
                    <h2>결제예상금액</h2>
                    <div className='row'>
                        <h1>57,000</h1>
                        <h2>원</h2>
                    </div>
                </div>
                <div className='payment'>
                    <p>노쇼방지비용 포함</p>
                    <p>5,000 원</p>
                </div>
            </div>
            <div className='Nbutton' onClick={() => navigate('/select-date')}>예약일 선택하기</div>
        </div>
    );
};

export default ReservationRequestPage;
