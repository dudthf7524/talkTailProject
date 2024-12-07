import React from 'react';
import { useNavigate } from 'react-router-dom';

const Confirm = () => {
    const navigate = useNavigate();
    const petImgUrl = `${process.env.PUBLIC_URL}/PageImage/pet/pet_img2.png`;
    return (
        <div lang='ko'>
            <div className='mid'>
                <div className='navigation'>
                    <div></div>
                    로그인 성공
                    <div></div>
                </div>
                <div className='review-mid'>
                    <div className='confirm' lang='ko'>
                            <h1>로그인 성공!</h1>
                            <img src={petImgUrl} alt=''/>
                            <p>로그인이 완료되었습니다.</p>
                    </div>
                </div>
            </div>
            <div className='Nbutton2'>
                <div className='Nbutton2-1'  onClick={() => navigate('/edit-user')}>
                    수정하기
                </div>
                <div className='Nbutton2-2'  onClick={() => navigate('/home')}>
                    홈으로
                </div>
            </div>
        </div>
    );
};

export default Confirm;
