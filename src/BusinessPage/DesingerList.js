import { useEffect } from 'react';
import api from '../Api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../BusinessCSS/desingerList.css'
function DesingerList() {
    const arrowButtonUrl = `${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`;
    const noteUrl = `${process.env.PUBLIC_URL}/PageImage/list/note_ic.svg`;
    const navigate = useNavigate();
    const [lists, setLists] = useState();


    useEffect(() => {
        const fetchAndAuthorizeUser = async () => {
            try {
                const response = await api.get('/api/business/desinger/list', { withCredentials: true });
                setLists(response.data);
                console.log(response.data)

                if (response.data == "common") {
                    navigate('/business/login');
                } else if (!response.data) {
                    navigate('/business/register/designer')
                }

            } catch (e) {
                console.error('권한 조회 실패:', e);
            }
        };

        fetchAndAuthorizeUser();
    }, []);

    if (!lists) {
        return (
            <div>
                로딩 중...
            </div>
        )

    }


    return (
        <div className='desingerlist'>
            <div className='desingerlistNavigation'>
                <button>
                    <img src={arrowButtonUrl} alt='' onClick={() => navigate('/business/menu')} />
                </button>
                디자이너 목록
                <button onClick={()=>navigate('/business/register/desinger')}>
                    <img src={noteUrl} alt='' />
                </button>
            </div>

            <div className='title'>
                <div className='text'>이름</div>
                <div className='text'>휴무일</div>
            </div>
            <div className="horizontal-line"></div>

            {
                lists.map((list, index) => (
                    <div key={index} className='desingerlist-row'>
                        <div className='desingerlist-item'>{list.business_desinger_name}</div>
                        <div className='desingerlist-item'><button  onClick={() => navigate('/business/write/ClosedDays')}>휴무일 설정</button></div>
                    </div>

                )
                )}

        </div>

    )
}

export default DesingerList;