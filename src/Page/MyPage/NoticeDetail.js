import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../Api'

const NoticeDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // URL에서 이벤트 ID 가져오기
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/images/list/arrow_left.svg`;
    const [lists, setLists] = useState();

    console.log(id)

    useEffect(() => {
        const noticeDetail = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found.');
                }
                const response = await api.get(`/api/customer/notice/detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setLists(response.data);
                // console.log(response.data)

            } catch (error) {

                console.error('로그인 인증 실패:', error);

            }
        };
        noticeDetail();
    }, []);
    // 초기 체크박스 상태를 배열로 관리
    const initialCheckboxes = [
        { label: '좋음', name: 'good' },
        { label: '건조', name: 'dry' },
        { label: '민감', name: 'sensitive' },
        { label: '붉음', name: 'red' },
        { label: '탈모', name: 'hairloss' },
        { label: '딱지', name: 'scab' },
        { label: '종기', name: 'boil' },
        { label: '각질', name: 'corneous' },
    ];

    const secondCheckboxes = [
        { label: '깨끗함', name: 'clean' },
        { label: '노란귀지', name: 'yellow earwax' },
        { label: '갈색귀지', name: 'brown earwax' },
        { label: '귓털많음', name: 'Lots of ear hair' },
    ];

    const thirdCheckboxes = [
        { label: '깨끗함', name: 'clean' },
        { label: '눈곱', name: 'gum' },
        { label: '충혈', name: 'congestion' },
    ];

    const fourthCheckboxes = [
        { label: '좋음', name: 'good' },
        { label: '습진', name: 'eczema' },
        { label: '건조', name: 'dry' },
    ];

    const fifthCheckboxes = [
        { label: '적당함', name: 'suitable' },
        { label: '짧음', name: 'short' },
        { label: '관리필요', name: 'maintenance required' },
    ];

    const sixthCheckboxes = [
        { label: '적당함', name: 'suitable' },
        { label: '많음', name: 'plenty' },
        { label: '안나옴', name: 'not come out' },
    ];

    const seventhCheckboxes = [
        { label: '유', name: 'existence' },
        { label: '무', name: 'nonexistence' },
    ];

    const [checkboxState, setCheckboxState] = useState(
        initialCheckboxes.reduce((acc, checkbox) => {
            acc[checkbox.name] = false;
            return acc;
        }, {})
    );

    const [secondCheckboxState, setSecondCheckboxState] = useState(
        secondCheckboxes.reduce((acc, checkbox) => {
            acc[checkbox.name] = false;
            return acc;
        }, {})
    );

    const [thirdCheckboxState, setThirdCheckboxState] = useState(
        thirdCheckboxes.reduce((acc, checkbox) => {
            acc[checkbox.name] = false;
            return acc;
        }, {})
    );

    const [fourthCheckboxState, setFourthCheckboxState] = useState(
        fourthCheckboxes.reduce((acc, checkbox) => {
            acc[checkbox.name] = false;
            return acc;
        }, {})
    );

    const [fifthCheckboxState, setFifthCheckboxState] = useState(
        fifthCheckboxes.reduce((acc, checkbox) => {
            acc[checkbox.name] = false;
            return acc;
        }, {})
    );

    const [sixthCheckboxState, setSixthCheckboxState] = useState(
        sixthCheckboxes.reduce((acc, checkbox) => {
            acc[checkbox.name] = false;
            return acc;
        }, {})
    );

    const [seventhCheckboxState, setSeventhCheckboxState] = useState(
        seventhCheckboxes.reduce((acc, checkbox) => {
            acc[checkbox.name] = false;
            return acc;
        }, {})
    );

    const goBack = () => {
        navigate(-1); // 뒤로 가기
    };

    const handleClickReview = (id) => {
        navigate(`/events/${id}/review`);
    };

    // 체크박스 변경 핸들러
    const handleCheckboxChange = (name, checked) => {
        setCheckboxState(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    // 두 번째 체크박스 그룹 체크박스 변경 핸들러
    const handleSecondCheckboxChange = (name, checked) => {
        setSecondCheckboxState(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleThirdCheckboxChange = (name, checked) => {
        setThirdCheckboxState(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleFourthCheckboxChange = (name, checked) => {
        setFourthCheckboxState(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleFifthCheckboxChange = (name, checked) => {
        setFifthCheckboxState(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleSixthCheckboxChange = (name, checked) => {
        setSixthCheckboxState(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleSeventhCheckboxChange = (name, checked) => {
        setSeventhCheckboxState(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

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
                            <p>2024.04.28</p>
                        </div>
                        <div className='view-head-name'>
                            <p>한라마운틴미용실</p>
                        </div>
                    </div>
                    <div className='view-pet'>
                        누렁이
                        <p>리트리버/7kg/남/2살</p>
                    </div>
                    <div className='view-contents-style'>
                        <h1>스타일</h1>
                        <p>1cm+말머리컷</p>
                    </div>
                    {/* <CheckboxGroup groupName="피부" checkboxes={initialCheckboxes} checkboxState={checkboxState} onChange={handleCheckboxChange} />
                    <CheckboxGroup groupName="귀" checkboxes={secondCheckboxes} checkboxState={secondCheckboxState} onChange={handleSecondCheckboxChange} />
                    <CheckboxGroup groupName="눈" checkboxes={thirdCheckboxes} checkboxState={thirdCheckboxState} onChange={handleThirdCheckboxChange} />
                    <CheckboxGroup groupName="발바닥" checkboxes={fourthCheckboxes} checkboxState={fourthCheckboxState} onChange={handleFourthCheckboxChange} />
                    <CheckboxGroup groupName="발톱" checkboxes={fifthCheckboxes} checkboxState={fifthCheckboxState} onChange={handleFifthCheckboxChange} />
                    <CheckboxGroup groupName="항문낭" checkboxes={sixthCheckboxes} checkboxState={sixthCheckboxState} onChange={handleSixthCheckboxChange} />
                    <CheckboxGroup groupName="털엉킴" checkboxes={seventhCheckboxes} checkboxState={seventhCheckboxState} onChange={handleSeventhCheckboxChange} /> */}
                    <div className='view-contents-etc'>
                        <h1>기타 특이사항</h1>
                        <p>미용하는 거 아주 좋아해서 얌전히 잘 미용했습니다.</p>
                        <p>칭찬 많이 해주세요. 충분한 휴식 부탁드립니다.</p>
                    </div>
                </div>
            </div>
            <div className='Nbutton' onClick={() => handleClickReview(id)}>후기 쓰러가기!</div>
        </div>
    );
};

export default NoticeDetail;
