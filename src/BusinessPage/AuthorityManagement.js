import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../BusinessCSS/auth.css'
import '../BusinessCSS/reservation.css'
import axios from 'axios';
import api from '../Api'


function AuthorityManagement() {
    const [user, setUser] = useState(null);
    const [lists, setLists] = useState([]);
    const location = useLocation();
    useEffect(() => {
        const fetchAndAuthorizeUser = async () => {
            console.log('Fetching user...');
            try {
                const userResponse = await api.get('/business/auth', { withCredentials: true });
                const userData = userResponse.data;
                console.log('Fetched user data:', userData);

                if (!userData) {
                    navigate('/business/login'); // 로그인 페이지로 리디렉션
                    return;
                }

                setUser(userData); // 사용자 상태 업데이트

                if (userData.business_registration_number) {
                    console.log('Fetching user authority...');
                    try {
                        const authorityResponse = await api.get('/api/user/authority', {
                            headers: {
                                'Business-Registration-Number': userData.business_registration_number,
                            },
                        });
                        console.log('User authority data:', authorityResponse.data);
                        setLists(authorityResponse.data);
                    } catch (authorityError) {
                        console.error('권한 조회 실패:', authorityError);
                    }
                }
            } catch (authError) {
                console.error('로그인 인증 실패:', authError);
                navigate('/business/login'); // 로그인 페이지로 리디렉션
            }
        };

        fetchAndAuthorizeUser();
    }, [location.pathname]);

    const authorityAvailableTrue = async (user_authority_request_id) => {
        const id = user_authority_request_id
        try {
            const response = await api.put('/api/user/authority/true', {
                id
            });
            console.log('요청수락 완료');
            window.location.href = '/business/authority/management';
        } catch (error) {
            console.log('요청 수락 에러', error.message)
        }
    }

    const navigate = useNavigate();
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/button/arrow_left.svg`;

    const reservations = [
        {
            requestTime: '24-05-10-13:39',
            desiredTime: '24-05-12-15:00',
            status: '완료',
            detailButton: '수락'
        },
        {
            requestTime: '24-05-10-13:39',
            desiredTime: '24-05-12-15:00',
            status: '완료',
            detailButton: '거절'
        },
    ];
    if (!user) {
        return <div>로딩 중...</div>;
    }
    return (
        <div className='page-container' lang='ko'>
            <div className='navigation'>
                <button>
                    <img src={arrowButtonUrl} alt='' onClick={() => navigate('/admin-menu')} />
                </button>
                권한관리
                <div> </div>
            </div>
            <div className='reservation-title'>
                <div className='reservation-text'>이름</div>
                <div className='reservation-text'>전화번호</div>
                <div className='reservation-text'>수락</div>
                <div className='reservation-text'>거절</div>
            </div>
            <div className="horizontal-line"></div>
            {lists.map((list, index) => (
                <div key={index} className='reservation-row'>
                    <div className='reservation-item'>
                        <p>{list.USER_INFO.user_name}</p> {/* 사용자 이름 */}
                    </div>
                    <div className='reservation-item'>
                        <p>{list.USER_INFO.user_phone}</p> {/* 사용자 전화번호 */}
                    </div>
                    {
                        list.authority_is_available === true
                    }

                    {
                        list.authority_is_available === true ? (
                            <>
                                {/* 수락완료, 거절완료 */}
                                <div className='reservation-item'>
                                    수락완료
                                </div>
                                <div className='reservation-item'>
                                    수락완료
                                </div>
                            </>
                        ) : (
                            <>
                                {/* 요청수락, 요청거절 */}
                                <div className='reservation-item'>
                                    <button className='detail-button' onClick={() => authorityAvailableTrue(list.user_authority_request_id)}>요청수락</button>
                                </div>
                                <div className='reservation-item'>
                                    <button className='refuse-button' onClick={() => navigate('/reservation-detail')}>요청거절</button>
                                </div>
                            </>
                        )
                    }
                </div>
            ))}

        </div>
    );
};

export default AuthorityManagement;