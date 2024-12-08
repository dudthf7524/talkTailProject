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
                <div className='navigation' onClick={() => navigate('/pet-select')}>
                    <div></div>
                    예약취소
                    <div></div>
                </div>
                <div className='review-mid'>
                    <div className='confirm' lang='ko'>
                        <h1>예약을 취소하시겠어요?</h1>
                        <img src={petImgUrl} alt=''/>
                        <p>아래 예약을 취소합니다.</p>
                    </div>
                </div>
                <div className='cancle-info'>
                    <h1>한라마운틴미용실</h1>
                    <h1>2024.02.26 오후 3시30분으로 예약완료.</h1>
                    <p>제주특별자치도 한라시 한라읍 한라동387-8번지 101호 백록담</p>
                </div>
            </div>
            <div className='Nbutton2'>
                <div className='Nbutton2-1' onClick={goBack}>
                    돌아가기
                </div>
                <div className='Nbutton2-2'  onClick={() => navigate('/home')}>
                    취소하기
                </div>
            </div>
        </div>
    );
};

export default Confirm;
