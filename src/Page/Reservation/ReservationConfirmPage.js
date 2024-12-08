import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Confirm = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // URL에서 이벤트 ID 가져오기
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/list/arrow_left.svg`;
    const petImgUrl = `${process.env.PUBLIC_URL}/images/pet/pet_img2.png`;

    // 상태 변수 추가
    const [status, setStatus] = useState('success'); // 'success' 또는 'failure'로 설정

    useEffect(() => {
        // URL 파라미터나 기타 로직을 사용하여 상태를 결정하는 로직을 추가할 수 있음
        // 예: setStatus('failure') // 예약 실패 시
    }, []);

    const goBack = () => {
        navigate(-1); // 뒤로 가기
    };

    return (
        <div lang='ko'>
            <div className='mid'>
                <div className='navigation'>
                    <button>
                        <img src={arrowButtonUrl} alt='' onClick={goBack} />
                    </button>
                    예약완료
                    <div></div>
                </div>
                <div className='review-mid'>
                    <div className='confirm' lang='ko'>
                        {status === 'success' ? (
                            <>
                                <h1>예약 완료!</h1>
                                <img src={petImgUrl} alt=''/>
                                <p>예약이 완료되었습니다.</p>
                            </>
                        ) : (
                            <>
                                <h1>예약 실패 😭</h1>
                                <img src={petImgUrl} alt=''/>
                                <p>예약한 시간에 서비스가 불가합니다. 다른 날짜에 다시 예약해주세요.</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className='Nbutton2'>
                <div className='Nbutton2-1'  onClick={() => navigate('/reservation')}>
                    예약목록
                </div>
                <div className='Nbutton2-2'  onClick={() => navigate('/home')}>
                    홈으로
                </div>
            </div>
        </div>
    );
};

export default Confirm;
