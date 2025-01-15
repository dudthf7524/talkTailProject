import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventTags from './EventTags';
import '../../CSS/listPage.css';
import api from '../../Api';
import { useDispatch, useSelector } from 'react-redux';
import { setBusinessInfo } from '../../redux/reservationData';
import { setHour } from '../../redux/reservationData';

const EventDetailPage = () => {
    const { id } = useParams();
    console.log(id)
    const navigate = useNavigate();
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/PageImage/list/arrow_left.svg`;
    const locationUrl = `${process.env.PUBLIC_URL}/PageImage/list/location.svg`;
    const callUrl = `${process.env.PUBLIC_URL}/PageImage/list/call.svg`;
    const shareUrl = `${process.env.PUBLIC_URL}/PageImage/list/share.svg`;
    const heartUrl = `${process.env.PUBLIC_URL}/PageImage/list/heart.svg`;
    const noteUrl = `${process.env.PUBLIC_URL}/PageImage/list/note.svg`;

    const [isButtonClicked, setIsButtonClicked] = useState(false);
    console.log(isButtonClicked)
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const [showAllImages, setShowAllImages] = useState(false); // 이미지 상태 추가
    const [business, setBusiness] = useState({});
    const [hours, setHours] = useState({});
    console.log(business)
    const accordionRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const dispatch = useDispatch();

    const handleButtonClick = () => {
        setIsButtonClicked(!isButtonClicked);
    };

    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    const toggleShowAllImages = () => {
        setShowAllImages(!showAllImages);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - accordionRef.current.offsetLeft);
        setScrollLeft(accordionRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - accordionRef.current.offsetLeft;
        const walk = (x - startX); // 스크롤 속도 조절
        accordionRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleSavedClick = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found.');
            }

            // 서버에 요청을 보낼 때 에러가 발생해도 앱이 멈추지 않도록 처리
            await api.post(`/api/saved`, {
                business_id: id,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log('Saved:', id);
        } catch (error) {
            console.log('Error occurred during save operation.');
            // 에러가 발생해도 사용자에게 표시하지 않고 로그로만 남김
        }
    };
    const designerName = useSelector((state) => state.reservationData); // Redux 상태 가져오기
    console.log("Selected Designer Name:", designerName);
    // 뒤로 가기
    const goBack = () => {
        navigate(-1);
    };

    const handleItemClick = (business) => {

        console.log(business.business_name)
        console.log(business.business_registration_number)
        console.log(business.business_no_show)
        console.log(hours)
        dispatch(setBusinessInfo({
            business_name: business.business_name,
            business_registration_number: business.business_registration_number,
            business_no_show: business.business_no_show,
        }));
        dispatch(setHour(hours));
        navigate(`/designer/list`);
    };

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found.');
                }
                const response = await api.get(`/api/business/detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setBusiness(response.data);
                setHours(response.data.hours)
                console.log('Business fetched:', response.data);
            } catch (error) {
                console.error('Error fetching business:', error);
            }
        };
        fetchBusiness();
    }, [id]);

    // 주어진 시간 데이터를 'HH:MM:SS' 형식에서 'HH:MM' 형식으로 변환
    const formatTime = (time) => {
        if (!time) return ''; // null 또는 undefined 처리
        const [hour, minute] = time.split(':'); // ':'를 기준으로 분할
        return `${hour}:${minute}`; // 시간과 분을 합쳐서 반환
    };

    // 사용 예시
    const weekdayOpenTime = formatTime(business.weekday_open_time);
    const weekdayCloseTime = formatTime(business.weekday_close_time);
    const weekendOpenTime = formatTime(business.weekend_open_time);
    const weekendCloseTime = formatTime(business.weekend_close_time);


    const operatingDays = Object.values(hours).filter(day => day.isOperatingDay === true);





    if (!business) {
        return <p>로딩 중...</p>; // 로딩 중일 때 처리
    }
    return (
        <div lang='ko'>
            <div className='mid'>pricing
                <div className='navigation'>
                    <button>
                        <img src={arrowButtonUrl} alt='' onClick={goBack} />
                    </button>
                    상세보기
                    <div></div>
                </div>
                <div className='blank'>

                </div>
                <div className='blank'>

                </div>

                <div className='event-img'>
                    {business.business_main_image ? (
                        <img src={business.business_main_image} alt='Main Event' style={{ width: "100%", height: "100%" }} />
                    ) : (
                        <p>이미지가 없습니다</p> // 이미지가 없는 경우에 대한 대체 텍스트
                    )}
                </div>
                <div className='event-title'>
                    <div>{business.business_name}</div>
                    <div className={`event-title-button ${isButtonClicked ? 'clicked' : ''}`} onClick={handleButtonClick}>
                        {EventDetailPage ? '예약대기' : '예약가능'}
                    </div>
                </div>
                <div className='event-address'>
                    <span>{business.location}</span>
                    {/* <div className='event-tag-container'>
                        <EventTags tags={business.tags} />
                    </div> */}

                    {operatingDays.length > 0 && (
                        <div>
                            {operatingDays.map((day, index) => {
                                const dayNames = ['일', '월', '화', '수', '목', '금', '토']; // 요일 배열
                                return (
                                    <p key={index}>
                                        {dayNames[index]}&nbsp;&nbsp;{formatTime(day.start_time)} - {formatTime(day.end_time)}
                                    </p>
                                );
                            })}
                        </div>
                    )}
                </div>
                <div className='event-button-container'>
                    {/* <div className='event-button'>
                        <button>
                            <img src={locationUrl} alt='' />
                        </button>
                        <div className='event-button-text'>위치</div>
                    </div> */}
                    <div className='event-button'>
                        <a href={`tel:${business.business_phone1}${business.business_phone2}${business.business_phone3}`}>
                            <button>
                                <img src={callUrl} alt='' />
                            </button>
                        </a>
                        <div className='event-button-text'>전화</div>
                    </div>
                    {/* <div className='event-button'>
                        <button>
                            <img src={shareUrl} alt='' />
                        </button>
                        <div className='event-button-text'>공유</div>
                    </div>
                    <div className='event-button'>
                        <button onClick={handleSavedClick}>
                            <img src={heartUrl} alt='' />
                        </button>
                        <div className='event-button-text'>찜</div>
                    </div> */}
                </div>
                <div className="event-text-box">
                    {business.business_comment}
                </div>
                <div className='information-text'>
                    가격표
                </div>
                <div className='img'>
                    <img src={business.business_price_image1} style={{ width: "300px", height: "300px" }}></img>
                </div>
                <div className='img'>
                    <img src={business.business_price_image2} style={{ width: "300px", height: "300px" }}></img>
                </div>
                {
                    business.business_price_image3
                        ?
                        <div className='img'>
                            <img src={business.business_price_image3} style={{ width: "300px", height: "300px" }}></img>
                        </div>
                        :
                        <div className='img'>
                        </div>
                }

                <div className='album-text'>
                    노쇼금액
                </div>
                <div className='writing-div'>
                    <div className='writing'>
                        {/* <img src={noteUrl} alt='' /> */}
                        {business.business_no_show} 원
                    </div>
                </div>
            </div>
            <div className='Nbutton' onClick={() => handleItemClick(business)}>예약하기</div>
        </div>
    );
};

export default EventDetailPage;