import React, { useEffect, useContext, useState, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { ImageContext } from '../Contexts/ImageContext';
// import '../BusinessCSS/registerInformation.css';
// import '../BusinessCSS/main.css';
import api from '../Api';
import InformationModal from './Modal/InformationModal';

function EditInformation() {
    // 주소 api
    const [postcode, setPostcode] = useState(""); // 우편번호
    const [roadAddress, setRoadAddress] = useState(""); // 도로명 주소
    const [jibunAddress, setJibunAddress] = useState(""); // 지번 주소
    const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 열림/닫힘 상태
    const [list, setLists] = useState({});
    const popupRef = useRef(null);
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const { imageFiles } = useContext(ImageContext);
    const navigate = useNavigate();
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessImage/button/arrow_left.svg`;
    const keyButtonUrl = `${process.env.PUBLIC_URL}/BusinessImage/icon/keyboard_return.svg`;
    const defaultImage = `${process.env.PUBLIC_URL}/PageImage/pet/pet_img_L.png`;

    const [formData, setFormData] = useState({
        business_name: '',
        address_postcode: '',
        address_road: '',
        address_jibun: '',
        business_no_show: '',
        business_phone1: '',
        business_phone2: '',
        business_phone3: '',
        business_comment: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/api/business/information/edit', { withCredentials: true });
                const data = response.data;

                if (data === "common") {
                    navigate('/business/login');
                    return;
                }
                if (data === null) {
                    navigate('/business/register/information');
                    return;
                }
                setLists(data); // 여기에서 list 상태를 업데이트
                console.log(Object.keys(data))
                console.log(Object.keys(data).length)
                const [phone1 = '', phone2 = '', phone3 = ''] = data.business_phone ? data.business_phone.split("-") : [];
                let businessNoShow = data.business_no_show != null 
                ? formatNumber(data.business_no_show) 
                : '';

                console.log(typeof data.business_no_show);
                console.log(typeof businessNoShow);
                console.log(businessNoShow)
                setFormData({
                    business_name: data.business_name || '',
                    address_postcode: data.address_postcode || '',
                    address_road: data.address_road || '',
                    address_jibun: data.address_jibun || '',
                    address_detail: data.address_detail || '',
                    business_no_show: businessNoShow || '',
                    business_phone1: phone1,
                    business_phone2: phone2,
                    business_phone3: phone3,
                    business_main_image: data.business_main_image,
                    business_price_image1: data.business_price_image1,
                    business_price_image2: data.business_price_image2,
                    business_price_image3: data.business_price_image3,
                    business_comment: data.business_comment || '',
                });
            } catch (error) {
                console.error('Failed to fetch business information:', error);
            }
        };

        fetchData();
    }, [navigate]);
    useEffect(() => {
        const textarea = document.getElementById('greetingTextarea');
        if (textarea) { // 요소가 존재하는지 확인
            const placeholderText = '간단한 인삿말\n30자 이내';
            textarea.setAttribute('placeholder', placeholderText);
            textarea.style.whiteSpace = 'pre-line';
        }
    }, []);
    const handleAddressSearch = () => {
        setIsPopupOpen(true);
        const currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);

        const script = document.createElement("script");
        script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        document.body.appendChild(script);

        script.onload = () => {
            new window.daum.Postcode({
                oncomplete: (data) => {
                    const updatedFormData = {
                        ...formData,
                        address_postcode: data.zonecode,
                        address_road: data.userSelectedType === "R" ? data.roadAddress : '',
                        address_jibun: data.jibunAddress,
                    };

                    setFormData(updatedFormData);
                    setPostcode(data.zonecode);
                    setRoadAddress(data.userSelectedType === "R" ? data.roadAddress : '');
                    setJibunAddress(data.jibunAddress);

                    setIsPopupOpen(false);
                    document.body.scrollTop = currentScroll;
                },
                onresize: (size) => {
                    if (popupRef.current) {
                        popupRef.current.style.height = `${size.height}px`;
                    }
                },
                width: "100%",
                height: "100%",
            }).embed(popupRef.current);
        };
    };

    const handleUploadClick = (pathName, imageType) => {
        navigate(`/business/imgupload/${pathName}/${imageType}`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === "business_no_show"
                ? formatNumber(value.replace(/\D/g, '')) // 숫자만 유지하고 포맷팅
                : value, // 다른 필드는 그대로 처리
        }));
    };

    // 숫자 포맷팅 함수 (세 자리마다 , 추가)
    const formatNumber = (value) => {
        if (value === 0) return '0'; // 0인 경우 '0' 반환
        if (!value) return '';       // null 또는 undefined인 경우 빈 문자열 반환
        return new Intl.NumberFormat('en-US').format(value);
    };

    const handleSave = async () => {
        try {
            const data = new FormData();
            // FormData에 텍스트 필드 추가
            Object.keys(formData).forEach((key) => {
                const value = key === "business_no_show"
                    ? formData[key].replace(/,/g, '') // 숫자 포맷 제거
                    : formData[key]; // 다른 필드는 그대로 추가
                data.append(key, value);
            });
         
            if (list?.business_information_id) {
                data.append('business_information_id', list.business_information_id);
            }

            

            // FormData에 이미지 파일 추가
            Object.keys(imageFiles).forEach((key) => {
                imageFiles[key].forEach((file) => {
                    data.append(key, file);
                });
            });
            // 서버로 FormData를 전송
            const response = await axios.put(`${apiUrl}/api/business/edit/information`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Upload successful:', response.data);

            // 성공적으로 업로드된 후 페이지를 이동하거나 추가 작업 수행
            navigate('/business/edit/information'); // 성공 페이지로 이동
        } catch (error) {
            console.error('Error during upload:', error);
            // 오류 처리
        }
    };
    const [user, setUser] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const [actionType, setActionType] = useState('');

    const openModal = (type) => {
        setActionType(type);
        setModalOpen(true);
    };

    if (!list || Object.keys(list).length === 0) {
        return <div>로딩 중...</div>;
    }
    return (
        <div className='mid' lang='ko'>
            <div className='navigation'>
                <button>
                    <img src={arrowButtonUrl} alt='' onClick={() => navigate('/admin-menu')} />
                </button>
                등록자료 수정하기
                <div style={{cursor : "pointer"}} onClick={() => openModal('accept')}>수정</div>
            </div>
            <div className='main-mid'>
                <h2>현재 저장된 메인 이미지</h2>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img
                        src={list.business_main_image}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
                <div className='upload-box' onClick={() => handleUploadClick('edit', 'main')}>
                    <p>메인사진(상세페이지 최상단 노출)</p>
                    <p>jpg 해상도 430*468</p>
                    <div>
                        <img src={keyButtonUrl} alt='' />
                        메인 이미지 수정
                    </div>
                </div>
                <h2>현재 저장된 가격표 이미지</h2>
                {
                    list.business_price_image1 ? (
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <img
                                src={list.business_price_image1}
                                alt="Business Price"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    ) : (
                        <div style={{ position: 'relative', display: 'inline-block' }}>

                        </div>
                    )
                }
                {
                    list.business_price_image2 ? (
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <img
                                src={list.business_price_image2}
                                alt="Business Price"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    ) : (
                        <div style={{ position: 'relative', display: 'inline-block' }}>

                        </div>
                    )
                }
                {
                    list.business_price_image3 ? (
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <img
                                src={list.business_price_image3}
                                alt="Business Price"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    ) : (
                        <div style={{ position: 'relative', display: 'inline-block' }}>

                        </div>
                    )
                }
                <div className='upload-box' onClick={() => handleUploadClick('edit', 'pricing')}>
                    <p>가격표</p>
                    <p>엑셀,이미지,pdf,한글 파일 등</p>
                    <div>
                        <img src={keyButtonUrl} alt='' />
                        가격표 이미지 수정
                    </div>
                </div>

                <div className='input-container'>
                    <p>상호명</p>
                    <input type='text' name='business_name' value={formData.business_name} onChange={handleInputChange} placeholder='상호명을 입력해 주세요.' />
                </div>
                {isPopupOpen && (
                    <div
                        style={{
                            display: "block",
                            position: "relative",
                            width: "100%",
                            height: "300px",
                            border: "1px solid #ddd",
                            marginTop: "10px",
                        }}
                    >
                        <img
                            src="//t1.daumcdn.net/postcode/resource/images/close.png"
                            alt="닫기"
                            style={{
                                cursor: "pointer",
                                position: "absolute",
                                top: "0px",
                                right: "0px",
                                zIndex: 1,
                            }}
                            onClick={() => setIsPopupOpen(false)}
                        />
                        <div
                            ref={popupRef}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        ></div>
                    </div>
                )}
                <div className='input-container'>
                    <button onClick={handleAddressSearch}>우편번호 찾기</button>


                </div>
                <div className='input-container'>


                    <p>우편번호</p>
                    <input type="text" name='address_postcode' value={formData.address_postcode} onChange={(e) => setPostcode(e.target.value)} placeholder="우편번호" />
                </div>
                <div className='input-container'>
                    <p>도로명 주소</p>
                    <input type="text" name='address_road' value={formData.address_road} onChange={(e) => setRoadAddress(e.target.value)} placeholder="도로명 주소" />
                </div>
                <div className='input-container'>
                    <p>지번 주소</p>
                    <input type="text" name='address_jibun' value={formData.address_jibun} onChange={(e) => setJibunAddress(e.target.value)} placeholder="지번 주소" />
                </div>
                <div className='input-container'>
                    <p>상세 주소</p>
                    <input type="text" name='address_detail' value={formData.address_detail} onChange={handleInputChange} placeholder="상세 주소" />
                </div>

                <div className='input-container-inline'>
                    <p>가게전화번호</p>

                    <input type='text' className='phone' name='business_phone1' value={formData.business_phone1} onChange={handleInputChange} />
                    <span className='phone'>-</span>
                    <input type='text' className='phone' name='business_phone2' value={formData.business_phone2} onChange={handleInputChange} />
                    <span className='phone'>-</span>
                    <input type='text' className='phone' name='business_phone3' value={formData.business_phone3} onChange={handleInputChange} />
                </div>

                <div className='input-container'>
                    <p>인삿말</p>
                    <div className="textarea-wrapper">
                        <textarea id='greetingTextarea' name='business_comment' value={formData.business_comment} onChange={handleInputChange} />
                    </div>
                </div>
                <div className='input-container'>
                    <p>예약 금액</p>
                    <input type="text" name='business_no_show' value={formData.business_no_show + " 원"} onChange={handleInputChange} />
                </div>
            </div>

            <InformationModal
                isOpen={isModalOpen && actionType === 'accept'}
                onClose={() => setModalOpen(false)}
                onConfirm={handleSave}
                registerInformation={formData}
                mainImage={imageFiles.main}
                priceImage={imageFiles.pricing}
                actionType={actionType}
            />


        </div>
    );
}

export default EditInformation;
