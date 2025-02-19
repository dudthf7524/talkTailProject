import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../../Api';

const CustomerManagementDetail = () => {
    const navigate = useNavigate();
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageimage/button/arrow_left.svg`;
    const [list, setList] = useState();
    const location = useLocation();
    const id = location.state?.id;
    console.log(id)

    useEffect(() => {
        const noticeDetail = async () => {
            try {
                const response = await api.get(`/api/customer/business/notice/detail/${id}`, { withCredentials: true });
                console.log(response.data)
                if(response.data === 'common'){
                    navigate('/business/login')
                }
                setList(response.data);
            } catch (error) {
                console.error('로그인 인증 실패:', error);
            }
        };
        noticeDetail();
    }, []);
    
    const calculateAge = (birthDate) => {
        if (!birthDate) return null; // 생년월일이 없을 경우 처리
        const birth = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        const dayDiff = today.getDate() - birth.getDate();

        // 생일이 아직 지나지 않았으면 나이를 하나 줄임
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
        return age;
    };

    const goBack = () => {
        navigate(-1); // 뒤로 가기
    };

    const handleClickReview = (id) => {
        navigate(`/events/${id}/review`);
    };

    if (!list) {
        return (
            <div>로딩 중....</div>
        )
    }

    return (
        <div lang='ko'>
            <div className='mid'>
                <div className='navigation'>
                    <button>
                        <img src={arrowButtonUrl} alt='' onClick={goBack} />
                    </button>
                    알림장 상세보기
                    <div></div>
                </div>
                <div className='review-mid'>
                    <div className='view-head'>
                        <div className='view-head-textbox'>
                            <h1>알림장</h1>
                        </div>
                    </div>
                    <div className='view-pet'>
                        {list.pet_name}
                        <p>  {list.pet_breed}/{list.pet_weight}kg/{list.pet_name}/{calculateAge(list.pet_birth)}살
                        </p>
                    </div>
                    <div className='view-contents-style'>
                        <div className='view-contents-title'>
                            <h1>스타일</h1>
                        </div>
                        <div className='view-contents-option'>

                            <p>{list.notice_style}</p>
                        </div>
                    </div>
                    <div className='view-contents-style'>
                        <div className='view-contents-title'>
                            <h1>피부</h1>
                        </div>
                        <div className='view-contents-option'>

                            <p>{list.notice_skin}</p>
                        </div>
                    </div>
                    <div className='view-contents-style'>
                        <div className='view-contents-title'>
                            <h1>귀</h1>
                        </div>
                        <div className='view-contents-option'>

                            <p>{list.notice_ear}</p>
                        </div>
                    </div>
                    <div className='view-contents-style'>
                        <div className='view-contents-title'>
                            <h1>눈</h1>
                        </div>
                        <div className='view-contents-option'>
                            <p>{list.notice_eye}</p>
                        </div>
                    </div>
                    <div className='view-contents-style'>
                        <div className='view-contents-title'>
                            <h1>발바닥</h1>
                        </div>
                        <div className='view-contents-option'>

                            <p>{list.notice_sole}</p>
                        </div>
                    </div>
                    <div className='view-contents-style'>
                        <div className='view-contents-title'>
                            <h1>발톱</h1>
                        </div>
                        <div className='view-contents-option'>
                            <p>{list.notice_claw}</p>
                        </div>
                    </div>
                    <div className='view-contents-style'>
                        <div className='view-contents-title'>

                            <h1>항문낭</h1>
                        </div>
                        <div className='view-contents-option'>

                            <p>{list.notice_analSac}</p>
                        </div>

                    </div>
                    <div className='view-contents-style'>
                        <div className='view-contents-title'>
                            <h1>털엉킴</h1>
                        </div>
                        <div className='view-contents-option'>

                            <p>{list.notice_hairTangling}</p>
                        </div>
                    </div>

                    <div className='view-contents-style'>
                        <div className='view-contents-title'>
                            <h1>특이사항</h1>
                        </div>
                        <div className='view-contents-option'>

                            <p>{list.notice_etc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerManagementDetail;
