import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Checkbox from './CheckboxGroup.js';
import '../../CSS/reservation.css';
import '../../CSS/notice.css';
import Payments from './Payments';
import { useSelector } from 'react-redux';
import axios from 'axios';
import api from '../../Api';
const ReservationRequestPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const { selectedPet } = location.state || {};
    console.log(selectedPet)
    const [style, setStyle] = useState('')
    const [reviewText, setReviewText] = useState(""); // 리뷰 텍스트 상태 관리
    const textareaRef = useRef(null); // textarea 참조를 위한 ref
    const [lists, setLists] = useState([]);

    const reservationData = useSelector((state) => state.reservationData); // Redux 상태 가져오기
    console.log("Selected Designer Name:", reservationData.businessInfo.business_no_show); // 리덕스 상태 출력
    console.log("Selected 사업자 번호:", reservationData.businessInfo); // 리덕스 상태 출력
    console.log("Selected 사업자 번호:", reservationData);



    const handleStyle = (e) => {
        setStyle(e.target.value);
        adjustTextareaHeight(); // 텍스트가 변경될 때 높이 조정
    };

    const handleCautionsChange = (e) => {
        const { value } = e.target;
        setReviewText(value);
    };

    const handleCheckboxChange = (name, checked) => {
        setFormData((prevState) => ({
            ...prevState,
            significantIssues: checked
                ? [...prevState.significantIssues, name]
                : prevState.significantIssues.filter((item) => item !== name),
        }));
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

    useEffect(() => {
        if (reservationData.businessInfo.business_registration_number) {
            const styleSignificant = async () => {
                console.log("styleSignificant")
                try {
                    const response = await api.post('/api/business/style/significantGet', {
                        business_registration_number: reservationData.businessInfo.business_registration_number,
                    });
                    console.log('User authority data:', response.data);
                    setLists(response.data);
                } catch (error) {
                    console.error('권한 조회 실패:', error.message);
                }
            };
            styleSignificant();
        } else {
            console.log("데이터가 아직 준비되지 않았습니다.");
        }
    }, [reservationData]);


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
        { label: lists.business_beauty_significant1, name: lists.business_beauty_significant1 },
        { label: lists.business_beauty_significant2, name: lists.business_beauty_significant2 },
        { label: lists.business_beauty_significant3, name: lists.business_beauty_significant3 },
        { label: lists.business_beauty_significant4, name: lists.business_beauty_significant4 },
        { label: lists.business_beauty_significant5, name: lists.business_beauty_significant5 },
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

    const goBack = () => {
        navigate(-1);
    };

    // 체크박스 변경 핸들러
    // const handleCheckboxChange = (name, checked) => {
    //     setCheckboxState(prevState => ({
    //         ...prevState,
    //         [name]: checked
    //     }));
    // };

    const handleCheckboxChange2 = (name, checked) => {
        setCheckboxState2(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleCheckboxChange3 = (name, checked) => {

        setFormData((prevState) => {
            const updatedIssues = checked
                ? [...prevState.significantIssues, name]  // 체크되면 배열에 추가
                : prevState.significantIssues.filter((item) => item !== name);  // 체크 해제되면 배열에서 제거

            console.log('Updated significantIssues:', updatedIssues);  // 체크박스 상태를 콘솔에 출력

            return { ...prevState, significantIssues: updatedIssues };
        });
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

    const openPaymentModal = () => {
        sendKakaoMessage("010-7751-4068", "메시지 보내기 성공")
        setShowPaymentModal(true);
    };
    const closePaymentModal = () => {
        setShowPaymentModal(false);
    };

    const confirmPayment = () => {
        setShowPaymentModal(false);
        navigate('/reservation-confirm');
    };
    const formatCurrency = (amount) => {
        return amount.toLocaleString('ko-KR'); // 한국어 스타일로 포맷
    };

    const sendKakaoMessage = async (userPhoneNumber, messageTemplate) => {
        console.log(userPhoneNumber)
        console.log(messageTemplate)
        const apiUrl = 'https://kakaoapi.example.com/v1/messages'; // 카카오 메시지 API 엔드포인트
        const apiToken = '44c334c2957d5bc80dab7c6deb6d1207'; // 카카오 Admin 키


        try {
            const response = await axios.post(apiUrl, {
                template_id: 'TEMPLATE_ID', // 승인된 템플릿 ID
                recipient_number: userPhoneNumber, // 사용자 전화번호
                variables: {
                    '#{username}': '홍길동',
                    '#{message}': messageTemplate,
                },
            }, {
                headers: {
                    Authorization: `KakaoAK ${apiToken}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('카카오톡 메시지 전송 성공:', response.data);
        } catch (error) {
            console.error('카카오톡 메시지 전송 실패:', error.response?.data || error.message);
        }
    };

    const [formData, setFormData] = useState({
        style: '',
        reviewText: '',
        significantIssues: [],  // 체크된 특이사항을 저장
        depositAmount: reservationData.businessInfo.business_no_show || 0,
        business_registration_number: reservationData.businessInfo.business_registration_number || '',
        designerName: reservationData.designerName || '',
        petId: reservationData.petId || '',
        date: reservationData.date || '',
        startTime: reservationData.startTime || '',
    });
    const reservationSave = async () => {

        const dataToSend = {
            beauty_style: style,
            beauty_caution: reviewText,
            beauty_significant:formData. significantIssues,
            depositAmount: formData.depositAmount,
            business_registration_number: formData.business_registration_number,
            business_desinger_id: formData.designerName || '',
            pet_id: formData.petId || '',
            date: formData.date || '',
            startTime: formData.startTime || '',
        };
        console.log(dataToSend)
        // try {
        //     const token = localStorage.getItem('token');
        //     const response = await api.post('/api/beauty/reservation', dataToSend,
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
                        
        //             }
        //         }
        //     );
        //     console.log(response)

        // } catch (error) {
            
        // }
        //  try{
        //     const token = localStorage.getItem('token');
        //     const response = await api.post('/api/akv10/alimtalk/send', JSON.stringify(dataToSend),
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //                 'Content-Type': 'application/json',
        //             }
        //         }
        //     );
        //     console.log(response)

        // }catch(error){

        // }
        try{
            const token = localStorage.getItem('token');
            const response = await api.post('/api/beauty/reservation', JSON.stringify(dataToSend),
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            console.log(response)
            navigate('/reservation')
        }catch(error){
            console.log('reservation road failed' + error)
        }

    }
    return (
        <div lang='ko'>
            <div className='navigation'>
                <button onClick={goBack}>
                    <img src={`${process.env.PUBLIC_URL}/PageImage/list/arrow_left.svg`} alt='뒤로가기' />
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
                    <p>{selectedPet.pet_breed}/{selectedPet.pet_weight}kg/{selectedPet.pet_gender ? '남' : '여'}/{calculateAge(selectedPet.pet_birth)}살 중성화 {selectedPet.pet_neuter}</p>
                </div>
                <div className='blank'></div>
                <div className='reservation-contents'>
                    <h1>스타일</h1>
                    <div className='reservation-contents-text'>
                        <textarea
                            ref={textareaRef}
                            value={style}
                            className='cautions-textarea'
                            placeholder='스타일을 입력해 주세요...'
                            onChange={handleStyle}
                        />
                    </div>
                </div>
                <Checkbox groupName="특이사항" checkboxes={thirdCheckboxes} checkboxState={formData.significantIssues} onChange={handleCheckboxChange3} />
                <div className='reservation-contents'>
                    <h1>주의사항</h1>
                    <div className='reservation-contents-text'>
                        <textarea
                            ref={textareaRef}
                            value={reviewText}
                            className='cautions-textarea'
                            placeholder='특이사항 이외의 주의해야 할 사항을 입력해 주세요...'
                            onChange={handleCautionsChange}
                        />
                    </div>
                </div>
            </div>
            <div className='payment-container'>
                <div className='payment'>
                    <h2>예약금</h2>
                    <div className='row'>
                        <h1>{formatCurrency(reservationData.businessInfo.business_no_show)} 원</h1>

                    </div>
                </div>
            </div>
            {
                reservationData.businessInfo.business_no_show
                    ? <div className='Nbutton' onClick={openPaymentModal}>예약 및 결제하기</div>
                    : <div className='Nbutton' onClick={reservationSave}>예약하기</div>
            }

            {showPaymentModal && (
                <Payments closePaymentModal={closePaymentModal} confirmPayment={confirmPayment} />
            )}
        </div>
    );
};

export default ReservationRequestPage;
